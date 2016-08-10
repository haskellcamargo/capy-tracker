## TODO List

1. [ ] Ruby application
    - [ ] Must contain field e-mail

2. [ ] JS Library
    - [ ] Must be included in the client website
    - [ ] Must send unique identifier (cookie or local storage)
    - [ ] Must send accessed URL
    - [ ] Must send access date and time

3. [ ] Website
    - [ ] Create a simple website (I'm gonna use capybaras)
    - [ ] Must contain a contact page with a form that send the contact to the API
    - [ ] Must contain e-mail field

## Expected behavior

```js
Visitor A
    /home
    /pricing
    ...

Visitor B
    /home
    /contact
        Action { Fill form }
        Action { Confirm }
        Then(API) {
            Creates contact for Visitor B
            When access Visitor B page, see: { Home, Contact } @ Postergate { About Then(API) { Append } }
        }
```

## **MUST**

- [ ] Be on GitHub
- [ ] README in english (explain how to run)
- [ ] TDD
- [ ] Deploy to `Heroku`

## Boilerplate

- [ ] Create a document with links and explanation

