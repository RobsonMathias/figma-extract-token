<img src='https://github.com/RobsonMathias/figma-extract-token/blob/master/docs/images/figma-extraction.png' width='200' height='auto' />

# Figma extract token
> A simple way to extract token's component from Figma and convert to your front-end project. [Documentation](https://robsonmathias.github.io/figma-extract-token/)

[![stars][]][github]
[![Downloads][]][npm]
[![Version][]][npm]
![size][]
![MIT License][license]

[version]: https://flat.badgen.net/npm/v/figma-extract-token
[downloads]: https://flat.badgen.net/npm/d/figma-extract-token
[license]: https://flat.badgen.net/badge/license/MIT/blue
[stars]: https://flat.badgen.net/github/stars/RobsonMathias/figma-extract-token
[size]: https://flat.badgen.net/bundlephobia/minzip/figma-extract-token
[npm]: https://npmjs.com/package/figma-extract-token
[github]: https://github.com/RobsonMathias/figma-extract-token

```
yarn add figma-extract-token

npm i figma-extract-token
```

## Features
-  Extract foundation styles from API Figma and convert to tokens.
-  Extract components style composed by inheritance from foundation tokens.
-  Compose multiple format of extraction SCSS, Typescrit, ES6, Android, IOS and so on with [Style dictionary](https://amzn.github.io/style-dictionary/#/).
-  Auto versioning controller, know what really changes from the last extraction.
-  Create change log of designers comments on library versioning.
-  Automate the token extraction with webhook and automated publish of library.
-  Create a dicionary name for the variable composition.
-  Works with most css-in-js libraries, composition inspired by [Styled system](https://github.com/styled-system).


## Try It Out
Try the [examples](https://github.com/RobsonMathias/figma-extract-token/tree/master/examples)
- [Basic example](https://github.com/RobsonMathias/figma-extract-token/tree/master/examples/basic)
- [Advanced example](https://github.com/RobsonMathias/figma-extract-token/tree/master/examples/basic)
- [Styled system example](https://github.com/RobsonMathias/figma-extract-token/tree/master/examples/basic)


### Table of contents
- [Concept](#concept)
- [Usage](#usage)
- [Docs](#docs)
- [Further Reading](#further-reading)
- [Built with Styled System](#built-with-styled-system)
- [Related](#related)

## Concept
This extractor is based on Foundations and Components, where the Design is the responsable to create token names, deprecated status, component comment and composition. The Developers should only create the extractor mapper and Run the script, all files generated by the extractor should not be modify by the developer.

To see more check it out [Documentation](https://robsonmathias.github.io/figma-extract-token/)

## Usage

### Figma configuration

- First on Figma, create at a document based on this [Figma Example](https://www.figma.com/file/PodXJDGjtBAdWiWtbrNtIP/POC-Design-Tokens-Extract?node-id=0%3A1), is required to compose two pages Foundation and Components.
- Keep the document IDm you're going to need to run the script, you can find on url  www.figma.com/file/**PodXJDGjtBAdWiWtbrNtIP**/...
- Generate and keep a personal token, you can find on **Main menu/ Help and account / account settings**

### Dictionary configuration
```dictionary.config.json
{
  "source": ["build/**/*tokens.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_tokens.scss",
        "format": "scss/variables"
      }]
    }
  }
}
```
That file is responsable to compose the extraction of component to a file for your project.
More examples of dictionary configuration check it out on [Style dictionary Config](https://amzn.github.io/style-dictionary/#/config)

### Figma extractor configuration
```figma.config.json
{
  "outDir": "./build",
  "dictionaryConfig": "./dictionary.config.json",
  "foundation": {
    "name": "Foundation",
    "children": {
      "Letter Spacing": {
        "extract": ["letterSpacing"]
      },
      "Color": {
        "extract": ["fills"]
      }
    }
  },
  "components": {
    "name": "Components",
    "inheritance": {
      "fills":  "color",
      "letterSpacing": "letterSpacing"
    }
  }
}

```
### Run the command

**Run examples:**
Add a environments var with you figma token:
```
export PERSONAL_TOKEN=123123...
```
```
cd example/advanced
yarn
yarn start
```
```
cd example/basic
yarn
yarn start
```

**Extraction:**
```
figma-extract-token--token=PERSONAL_TOKEN --document=DOCUMENT_ID --config=figma.config.json
```

**Build:**
```
yarn build
```

**Dev:**
```
yarn dev
```

**Lint:**
```
yarn lint
```

**Test:**
```
yarn test
```

**Format:**
```
yarn format
```

To learn more, see the [Getting Started](https://robsonmathias.github.io/figma-extract-token/getting-started) guide or read the docs.

## Docs

- [Getting Started](https://robsonmathias.github.io/figma-extract-token/getting-started)
- [How it Works](https://robsonmathias.github.io/figma-extract-token/how-it-works)
- [Figma Strcture](https://robsonmathias.github.io/figma-extract-token/figma-structure)
- [Config](https://robsonmathias.github.io/figma-extract-token/configuration)
- [Style Dictionary](https://robsonmathias.github.io/figma-extract-token/styled-dictionary)
- [Versioning](https://robsonmathias.github.io/figma-extract-token/versioning)
- [Styled System](https://robsonmathias.github.io/figma-extract-token/styled-system)
- [Reference Table](https://robsonmathias.github.io/figma-extract-token/table)
- [Packages](https://robsonmathias.github.io/figma-extract-token/packages)
- [Guides](https://robsonmathias.github.io/figma-extract-token/guides)

---

## Further Reading
To Do

## Related
To Do

## Feedback 
Any questions or suggestions?

You are welcome to discuss it on:

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/robsondmathias)
