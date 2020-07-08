/**
 * the plugin with all généric api call,
 * this is also same than axios, for do a call to the api
 */
/* eslint-disable */

class EventDispatcher {

  constructor() {
      this._listeners = [];
  }

  hasEventListener(type, listener) {
      return this._listeners.some(item => item.type === type && item.listener === listener);
  }

  addEventListener(type, listener) {
      if (!this.hasEventListener(type, listener)) {
          this._listeners.push({type, listener, options: {once: false}});
      }
      // console.log(`${this}-listeners:`,this._listeners);
      return this
  }

  removeEventListener(type, listener) {
      let index = this._listeners.findIndex(item => item.type === type && item.listener === listener);
      if (index >= 0) this._listeners.splice(index, 1);
//        console.log(`${this}-listeners:`, this._listeners);
      return this;
  }

  removeEventListeners() {
      this._listeners = [];
      return this;
  }

  dispatchEvent(evt) {
      this._listeners
          .filter(item => item.type === evt.type)
          .forEach(item => {
              const {type, listener, options: {once}} = item;
              listener.call(this, evt);
              if (once === true) this.removeEventListener(type, listener)
          });
      // console.log(`${this}-listeners:`,this._listeners);
      return this
  }
}

class ApiRequest extends EventDispatcher {
  constructor(VUE) {
    super();
    this.uri = process.env.VUE_APP_BACK_END_URI;
    this.request = this._Api();
    this.token = '';
    this.userType = '';
    this.Vue = VUE
  }

  /**
   * methods for call endpoints
   */
  _Api() {
    const init = {
      mode: 'cors',
      cache: 'default',
      'Content-Type': 'application/json',
    };
    return {
      /**
       * done a call api with methode get
       * @param  {string} path path of request api
       * @param  { Object } payload data send to the api header, ...ect
       * @return {Promise}
       */
      get: (path, payload) => new Promise((resolve, reject) => {
        fetch(path, {
          ...init,
          ...payload.body,
          headers: new Headers({ ...payload.Headers }),
          method: 'GET',
        }).then((res) => {
          if (res.ok) {
            return resolve(res.json());
          }
          return res.json().then((res2) => {
            reject(res2);
          });
        }).catch((res) => reject(res && res.json()));
      }),

      /**
       * done a call api with methode post
       * @param  {string} path path of request api
       * @param  { Object } payload data send to the api header, ...ect
       * @return {Promise}
       */
      post: (path, payload) => new Promise((resolve, reject) => {
        payload.Headers = payload.Headers ?  payload.Headers : {}
        payload.Headers['Content-Type'] = payload.Headers['Content-Type'] ? payload.Headers['Content-Type'] : 'application/json';
        fetch(path, {
          ...init,
          headers: new Headers(payload.Headers),
          body: JSON.stringify(payload.body,),
          method: 'post',
        }).then((res) => {
          if (res.ok) {
            return resolve(res.json());
          }
          return res.json().then((res2) => {
            reject(res2);
          });
        }).catch((res) => reject(res.json()));
      }),
      ///
      delete: (path, payload) => new Promise((resolve, reject) => {
        payload.Headers = payload.Headers ?  payload.Headers : {}
        payload.Headers['Content-Type'] = payload.Headers['Content-Type'] ? payload.Headers['Content-Type'] : 'application/json';
        return fetch(path, {
          ...init,
          headers: new Headers(payload.Headers),
          body: JSON.stringify(payload.body,),
          method: 'delete',
        }).then((res) => {
          if (res.ok) {
            return resolve(res.json());
          }
          return res.json().then((res2) => {
            reject(res2);
          });
        }).catch((res) => reject(res));
      }),
    };
  }

  /**
   * allow to set the token in the requestApi
   * @param  {String} token new token
   */
  setToken(token) {
    if (typeof token === 'string' && token.length) {
      this.token = token;
    } else {
      console.error('the token is not be to good format');
    }
  }

  setUserType (type) {
    if (typeof type === 'string' && type.length) {
      this.userType = type;
    } else {
      console.error('the type is not be on the good format');
    }
  }

  /**
   * allow to get a token of user and set on the store
   * @param  {Object} loginInformaion information waiting , mail and passworld
   */
  login(loginInformaion) {
    return new Promise((resolve, reject) => {
      return this.post('/login_check', {body : loginInformaion })
        .then((res) => {
          this.dispatchEvent(new CustomEvent('session-user-login', { detail: res }));
          console.log(res)
          return resolve(res);
        }).catch((res) => {
          console.log(res)
          return reject(res);
        })
    })
  }

  getGouvernance() {
    return new Promise((resolve, reject) => {
      return this.get(`/governances`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        this.dispatchEvent(new CustomEvent('composant-gouvernanceList', { detail: response}));
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  /**
   * allow to get a token of user and set on the store
   * @param  {Object} loginInformaion information waiting , mail and passworld
   */
  postRegister(registerPayload) {
    return this.post('/register', {body : registerPayload})
      .then((res) => {
        this.dispatchEvent(new CustomEvent('user-registred', { detail: registerPayload }));
        return res;
      }).catch((res) => res);
  }

  /**
   * allow to call the endpoint for get information of custumer and set to the store
   * @param  {String} token token of custumer
   */
  getUserInfo(token) {
    return new Promise((resolve, reject) => {
      return this.get('/me', { Headers: { Authorization: `Bearer ${token || this.token}` } })
        .then((res) => {
          this.dispatchEvent(new CustomEvent('session-user-information', { detail: res }));
          return resolve(res);
        })
        .catch((res) => reject(res));
    })
  }

  /**
   * allow to get the solde of adhérent
   * @param  {String} type type is particular or company
   */
  getDetails(type = this.userType) {
    if (type) {
      return new Promise((resolve, reject) => {
        return this.get(`/${type}/account`, { Headers: { Authorization: `Bearer ${this.token}` , 'Content-Type': 'application/x-www-form-urlencoded'} })
          .then((res) => {
            this.dispatchEvent(new CustomEvent('session-user-details', { detail: res.length ? res[0] : res }));
            return resolve(res);
          })
          .catch((res) => reject(res));
      })
    }
  }

  /**
   * get the last transaction
   * @param {string} 
   */
  getMyTransaction() {
    return this.get('/transactions', {
      Headers: { Authorization: `Bearer ${this.token}` },
    }).then((response) => {
      this.getDetails(this.userType)
      this.dispatchEvent(new CustomEvent('session-user-transactions', { detail: response.length ? response[0] : response}));
      return response;
    })
      .catch(((response) => response));
  }

  getCompanyPost() {
    return this.get('/posts', {
      Headers: { Authorization:`Bearer ${this.token}` },
    }).then((response) => {
      this.dispatchEvent(new CustomEvent('session-user-companypost', { detail: response}));
      return response
    })
      .catch((response) => response);
  }

  getCompanyList() {
    return this.get('/companies', {
      Headers: { Authorization:`Bearer ${this.token}` },
    }).then((response) => {
      this.dispatchEvent(new CustomEvent('companies-list', { detail: response}));
      return response
    })
      .catch((response) => response);
  }

  getContactList() {
    return this.get('/contacts', {
      Headers: { Authorization:`Bearer ${this.token}` },
    }).then((response) => {
      this.dispatchEvent(new CustomEvent('companies-list', { detail: response}));
      return response
    })
      .catch((response) => response);
  }
  
  putTransferMoney(transactionInformation) {
    return new Promise((resolve, reject) => {
      return this.post('/transfer-money', {
        Headers: { Authorization:`Bearer ${this.token}` },
        body : transactionInformation,
      }).then((response) => {
        this.getMyTransaction()
        this.getUserInfo()
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  putPost(payload) {
    return new Promise((resolve, reject) => {
      return this.post('/posts/create', {
        Headers: { Authorization:`Bearer ${this.token}` },
        body : payload,
      }).then((response) => {
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  putLike(idPost) {
    return new Promise((resolve, reject) => {
      return this.get(`/post/${idPost}/like`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  putDislike(idPost) {
    return new Promise((resolve, reject) => {
      return this.get(`/post/${idPost}/dislike`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  getContacts() {
    return new Promise((resolve, reject) => {
      return this.get(`/contacts`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        this.dispatchEvent(new CustomEvent('user-contacts', { detail: response}));
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }
  
  putContact(playload) {
    return new Promise((resolve, reject) => {
      return this.post(`/contacts/create`, {
        Headers: { Authorization:`Bearer ${this.token}` },
        body: playload,
      }).then((response) => {
        this.getContacts()
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  removeContact(contactId) {
    return new Promise((resolve, reject) => {
      return this.delete(`/contacts/${contactId}/delete`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        this.dispatchEvent(new CustomEvent('remove-contact', { detail: contactId}));
        return resolve(response)
      })
      .catch((response) => reject(response));
    })
  }

  getFavorites(contactId) {
    return new Promise((resolve, reject) => {
      return this.get(`/favorites`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }

  /**
   * @param  {Object} payload 
   * @param {string} payload.accountId - exemple "170"
   */
  addFavorites( payload ) {
    return new Promise((resolve, reject) => {
      return this.post(`/favorites/create`, {
        Headers: { Authorization:`Bearer ${this.token}` },
      }).then((response) => {
        return resolve(response)
      })
        .catch((response) => reject(response));
    })
  }


  

  
  get(path, payload) {
    return this.request.get(this.uri + (path || ''), payload || {});
  }

  post(path, payload) {
    return this.request.post(this.uri + (path || ''), payload || {});
  }

  put(path, payload) {
    return this.request.put(this.uri + (path || ''), payload || {});
  }

  delete(path, payload) {
    return this.request.delete(this.uri + (path || ''), payload || {});
  }
}

export default {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue) {
    const apiRequest = new ApiRequest(Vue);
    Vue.prototype.$Api = apiRequest;
  },
};
