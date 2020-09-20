'use strict'

module.exports = function (count = 10, template = TEMPLATE) {
  const ret = []

  for (let i = 0; i < count; i++) {
    ret.push(populate(template))
  }

  return ret

  function populate (obj) {
    const bod = {}
    for (const key of Object.keys(obj)) {
      if (obj[key].type != null) {
        const [type, ...args] = Object.values(obj[key])
        bod[key] = typeSwitch(type, args)
      } else if (obj[key].constructor === Object) {
        bod[key] = populate(obj[key])
      }
    }
    return bod
  }

  function typeSwitch (type, args) {
    switch (type) {
      case 'number':
        return _number(...args)
      case 'name':
        return _name(...args)
      case 'letter':
        return _letter(...args)
      case 'height':
        return _height(...args)
      case 'email':
        return _email(...args)
      case 'uuid':
        return _uuid()
      case 'array':
        return _array(...args)
      case 'age':
        return _age(...args)
      case 'race':
        return _race(...args)
      case 'lorem':
        return _lorem(...args)
      case 'passthrough':
        return _passthrough(...args)
      case 'boolean':
        return _boolean(...args)
      case 'phone':
        return _phone(...args)
      case 'choose':
        return _choose(...args)
      case 'date':
        return _date(...args)
      case 'characters':
        return _characters(...args)
      case 'base64':
        return _base64(...args)
      default:
        return PLACEHOLDER
    }
  }

  function _number (maximum = 1e6) {
    return index(maximum)
  }

  function _name (length = 10) {
    if (length === 'rand' || length === 'random') length = 1 + index(16)

    let name = ''
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        name += LETTERS.substr(index(LETTERS.length), 1).toUpperCase()
      } else name += LETTERS.substr(index(LETTERS.length), 1)
    }
    return name
  }

  function _letter (capitalized = false) {
    if (capitalized !== false) {
      return LETTERS.substr(index(LETTERS.length), 1).toUpperCase()
    }
    return LETTERS.substr(index(LETTERS.length), 1)
  }

  function _height (maximum = 10, units) {
    if (!units) units = Math.random() > 0.5 ? 'metric' : 'imperial'
    if (units === 'm' || units === 'metric') {
      return `${index(maximum)}.${index(100)}m`
    }
    if (units === 'ft' || units === 'imperial') {
      return `${index(maximum)}'${index(12)}"`
    }
  }

  function _email (length = 12, suffix) {
    if (!suffix) suffix = EMAIL_HOST[index(EMAIL_HOST.length)]
    return `${_name()}@${suffix}`
  }

  function _array (length = 10, ...args) {
    if (length === 'rand' || length === 'random') {
      length = 1 + index(9)
    }

    const ret = []
    for (let i = 0; i < length; i++) {
      ret.push(typeSwitch(...args))
    }
    return ret
  }

  function _uuid () {
    // 4-2-2-2-6
    let uuid = ''
    for (let i = 0; i < 32; i++) {
      uuid += HEX_DIGITS[index(HEX_DIGITS.length)]
      if (i === 7 || i === 11 || i === 15 || i === 19) {
        uuid += '-'
      }
    }
    return uuid
  }

  function _age (maximum = 1000, units) {
    if (!units) units = AGE_UNITS[index(AGE_UNITS.length)]
    return `${index(maximum)} ${units}`
  }

  function _race (passthrough) {
    if (passthrough && passthrough.constructor === String) return passthrough
    return RACES[index(RACES.length)]
  }

  function _lorem (length = 256) {
    if (length === 'rand' || length === 'random') length = index(1024)
    let lorem = ''
    if (length > LOREM_IPSUM.length) {
      lorem += LOREM_IPSUM.repeat(length / LOREM_IPSUM.length)
    }
    lorem += LOREM_IPSUM.slice(0, length % LOREM_IPSUM.length) + '.'
    return lorem
  }

  function _passthrough (passthrough) {
    return passthrough
  }

  function _choose (choices) {
    if (choices.constructor !== Array) return PLACEHOLDER
    return choices[index(choices.length)]
  }

  function _boolean (passthrough) {
    if (passthrough === true || passthrough === false) return passthrough
    return Math.random() > 0.5
  }

  function _phone (code) {
    if (!code) {
      code =
        Math.random() > 0.5
          ? `${index(9)}${index(9)}${index(9)}`
          : `1-${index(9)}${index(9)}${index(9)}`
    }

    const area = `${index(9)}${index(9)}${index(9)}`
    const office = `${index(9)}${index(9)}${index(9)}`
    const line = `${index(9)}${index(9)}${index(9)}${index(9)}`
    return `${code}-${area}-${office}-${line}`
  }

  function _date (ts) {
    if (!ts || ts.constructor !== Number) {
      ts = Math.floor(Math.random() * Math.pow(2, 52)) // < 2^53 - 1
      ts = Math.random() > 0.5 ? ts : -1 * ts
    }
    return new Date(ts)
  }

  function _characters (length = 12) {
    let characters = ''
    if (length === 'rand' || length === 'random') length = index(12)
    for (let i = 0; i < length; i++) {
      characters += CHARACTERS[index(CHARACTERS.length)]
    }
    return characters
  }

  function _base64 (raw) {
    if (!raw || raw.constructor !== String) raw = _characters(24)
    return Buffer.from(raw).toString('base64')
  }

  function index (len) {
    return Math.floor(Math.random() * len)
  }
}

const PLACEHOLDER = 'npm:mockuments'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const CHARACTERS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const EMAIL_HOST = [
  'gmail.com',
  'yahoo.mail',
  'aol.net',
  'proton.mail',
  'iss.network',
  'warpmail.drive',
  'bugzrule.hivemind',
  'borg.assimilate'
]
const HEX_DIGITS = '123456789abcdef'
const AGE_UNITS = [
  'second(s)',
  'day(s)',
  'month(s)',
  'year(s)',
  'epoch(s)',
  'BigBang(s)'
]
const RACES = [
  'human',
  'insectoid',
  'insectoid-human hybrid',
  'android',
  'chimera',
  'siliconoid',
  'unknown',
  'unidentified',
  'unclassified'
]
const LOREM_IPSUM =
  'Interdum et malesuada fames ac ante ipsum primis in faucibus. ' +
  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; ' +
  'Phasellus elementum dignissim tortor vel interdum. Nullam scelerisque, neque id malesuada pellentesque, ' +
  'lacus ex tincidunt justo, nec porttitor erat eros id eros. Sed quis magna at nulla ornare facilisis. ' +
  'Aliquam facilisis elit sed nibh pharetra, tristique finibus leo ultricies. Sed congue tortor egestas tortor auctor sodales. '
const TEMPLATE = {
  first: { type: 'name', max: 'rand' },
  middle: { type: 'letter', caps: true },
  last: { type: 'name', max: 'rand' },
  bio: {
    height: { type: 'height', max: 8 },
    age: { type: 'age', max: 100 },
    race: { type: 'race' },
    prey: { type: 'race' },
    bloodtype: {
      type: 'choose',
      vals: [
        'A',
        'A+',
        'A-',
        'B',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O',
        'O-',
        'O+',
        'RH-',
        'RH+',
        'Zeta1.0',
        'Zeta1.1',
        'VK+',
        'VK-',
        'None',
        'Unknown'
      ]
    },
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
