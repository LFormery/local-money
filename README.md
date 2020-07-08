
# Neymo

Service de création et de money locale projet d'etude avec l'école @Hetic !
 
### Commande

Link to of the site : [neymo](https://neymo.benjaminadida.fr/)

>  ***Récupérer le repo***  `git clone https://github.com/lucrampro/local-money.git`

>  ***Lancer le projet***  `npm start` ou `npm run serve`

>  ***Compilé le projet***  `npm run build`

### Problèmatique

Neymo est une application bancaire de monnaie local, qui sera utilisé sur mobile.
cette application sera souvent utilisée dans des conditions non optimum, avec des faibles connexions par exemple ou des coupures d'internet.
alors afin d'avoir une application la moins lourde possible, nous faison attentions à toute les dépendence installer afin d'avoir le build le plus légé possible.

### Technologie

Framework Javascript ***Vue.js***

Nous avons décidé d'utiliser vue js, car elle fait partie de notre stack technique en entreprise, 
ce qui nous permet une plus grande aisance à coder.
une autre raison et l'utilisation de vue cli, qui nous permet d'installer et de gérer très facilement notre pwa.

Un des grands points importants de notre application, ce sont les performances, et Vue apport des performances intéressantes, malrgré qu'il ne soit pas le plus performant des framwork sur le marché, il y a une grande communauté ce qui nous permet de débuger et de maintenir notre code plus facilement, au contraire d'un framework comme Svelte qui est encore jeune.

Librarie Javascript ***Veevalidate***

Nous pensons que Veevalidate est une libraire nécessaire afin de gérer la validation de nos différents formulaire.
Accompagner de VueI18n les messages d'erreur sont gérer par vue Veevalidate et automatiquement lié au rules.

Librarie Javascript ***GreenSock***

Apres reflexion nous pensons que cette librarie est la meilleur pour animé et donner vie a notre application.
GreenSock est recconu pour sa legerté et son optimisation de plus sa syntaxe simple permet une prise en main rapide et efficace.