# Mockuments

Mock JSON Documents with funny defaults.

Formerly [Socuments](https://github.com/mster/socuments).

![carbon](https://user-images.githubusercontent.com/15038724/93692886-7eb07080-faad-11ea-99ca-784f2188f26f.png)

## Usage

### **mockuments** ([ count, template ])

- **count**: &lt;Number&gt;<br>the number of mockuments to generate, defaulting to 10.

- **template**: &lt;Object&gt;<br>a mockuments template. See [templates](#templates) for more information on creating a custom template.

- **returns**: &lt;Array&gt;<br>An array of mockuments.

```js
const mocks = require("mockuments")();

const mocks100 = require("mockuments")(100);

const template = {
  firstName: { type: "name", length: "random" },
  lastName: { type: "name", length: 10 },
  lastLogin: { type: "date" },
  email: { type: "email" },
  loggedIn: { type: "boolean" },
};
const customMocks = require("mockuments")(10, template);
```

## Templates

To use your own template to generate Mockuments, simply supply a template object. Templates require a particular structure, requiring atleast a type field. Mockuments support some custom types along with many of the JS types.

### Default template

```js
{
  first: { type: 'name', max: 'rand' },
  middle: { type: 'letter', caps: true },
  last: { type: 'name', max: 'rand' },
  bio: {
    height: { type: 'height', max: 8 },
    age: { type: 'age', max: 100 },
    race: { type: 'race' },
    prey: { type: 'race' },
    bloodtype: { type: "choose", vals: [ "A", "...", "Unknown" ] },
    notes: { type: 'array', length: 'rand', content: 'lorem' }
  },
  contact: {
    onEarth: { type: 'boolean' },
    mobile: { type: 'phone' },
    email: { type: 'email' },
    password: { type: 'base64' },
    uuid: { type: 'uuid' },
    aliases: { type: 'array', length: 'rand', content: 'uuid' }
  },
  lastLogin: { type: 'date' },
  generatedBy: { type: 'passthrough', pass: 'npm:mockuments' }
}

```
