import * as forms from '../../src/util/form';

const mockElement = (attributes = {}) => {
  return {
    attributes,
    getAttribute(attr) {
      return this.attributes[attr];
    },
    removeAttribute(attr) {
      this.attributes[attr] = undefined;
      delete this.attributes[attr];
    },
    setAttribute(attr, value) {
      this.attributes[attr] = value;
    }
  };
};

describe('forms', () => {
  it('disables all elements', () => {
    const elements = [mockElement(), mockElement({ disabled: false })];

    forms.disableElements(elements);

    elements.forEach(el => {
      expect(el.getAttribute('disabled')).toBe(true);
    });
  });

  it('enables all elements', () => {
    const elements = [
      mockElement(),
      mockElement({ disabled: true }),
      mockElement({ disabled: false })
    ];

    forms.enableElements(elements);

    elements.forEach(el => {
      expect(el.getAttribute('disabled')).toBe(undefined);
    });
  });

  describe('input validation', () => {
    const makeEl = (type, value) => {
      return {
        getAttribute: () => type,
        value
      };
    };

    describe('text fields', () => {
      // valid
      ['1', 'Hello', `Hello, my name is Dustin Schau`].forEach(str => {
        it(`returns true for sample string '${str}'`, () => {
          expect(forms.elementIsValid(makeEl('text', str))).toBe(true);
        });
      });

      //invalid
      ['', false, null, undefined].forEach(value => {
        it(`returns false for invalid input ${value}`, () => {
          expect(forms.elementIsValid(makeEl('text', value))).toBe(false);
        });
      });
    });

    describe('email fields', () => {
      //valid
      [
        'd@d.com',
        'dustinschau@gmail.com',
        'dustinschau+modifier@gmail.com',
        'D@1.com',
        'D@me.me'
      ].forEach(email => {
        it(`returns true for email ${email}`, () => {
          expect(forms.elementIsValid(makeEl('email', email))).toBe(true);
        });
      });

      //invalid
      ['', 'd', 'd@d', false, undefined, null].forEach(value => {
        it(`returns false for invalid input ${value}`, () => {
          expect(forms.elementIsValid(makeEl('email', value))).toBe(false);
        });
      });
    });
  });
});
