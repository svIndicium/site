Welcome to VUE, you'll love it here.

Vue is easy and forgiving (unlike your exams),
Take a look at the [Vue documentation](https://vuejs.org/guide/introduction.html) it's actually good. (You'll most likely look at the composition api variant, but don't worry. Everything will work together if you need to use options!)

# Install Guide

## The basics

Download and install [Node.js](https://nodejs.org/en/) LTS version is fine.
You do not need chocolaty to work on this project.
After install restart your pc

## Install the vue extention:

This will help you a lot.
[Devtools for Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
[Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Install and run with VS Code

Download [VS Code](https://code.visualstudio.com/download) (if you haven't already)

### VS Code plugins

- EditorConfig (EditorConfig)
- ESlint (Dirk Baeumer)
- Volar (Vue)
- Task runner (Sana Ajani) (optional, but very good)

### Run file

1st run: Run the install task from the Task Runner

![image](https://user-images.githubusercontent.com/22635990/109289352-60059100-7826-11eb-88ff-d38828a57a57.png)

Or use `Ctrl+Shift+P` to open tasks and select npm install

To run the program, Run the task dev.
At first run you can select no on the data collection prompt in the terminal.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## You need to know this.

Const x = ref()
Is dus eigenlijk geen constante. En vergeet er niet .value achter te zetten soms.
Oh en install de vue extentie / vs code addon

Doet TS moeilijk?
Probeer het op te lossen en vraag het anders als je er niet uitkomt.
vreemde oplossingen om TS tevreden te stellen zijn waarschijnlijk niet nodig

Vue moeilijk?
Dat hoort het niet te zijn.
Kijk of je recente documentie hebt. Ook binnen in vue 3 is alles makkelijker geworden.
Check of het `script setup lang="ts"` is en niet alleen `script`.

Moet ik van de content json gebruik maken?
Liever niet. Je kan als je fan bent het als const bovenin het het script zetten. Voor de v-for statements.

Wanner class="" en wanneer :class=""?
:als het een variabele is van je code. dus niet letterlijk de string

```
var x = "hello"
class="x" -> class=X.
:Class="x" -> class=Hello
```

Css kleuren niet goed?
Andere studievereniging uitzoeken.

Mag ik dit?
Ja alles mag en alles kan.

Kan het stuk?
Gewoon commits maken en pushen.
Werkt het op dev? dan kan het naar de master.

Wat moet er komen als inhoud?
Verzin iets of rip de oude teksten als ze nog relevant zijn.
