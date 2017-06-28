# Claith

A set of React components for Bootstrap 4.

## Components

### Grid system

The `Container`, `Row` and `Col` components help you put together a grid.

**Container**

Props:
 * `fluid` (boolean) - true for a container which fills its parent, or false (or omitted) for a fixed-width container

**Row**

No extra props.

**Col**

Props:
  * `xs`, `sm`, `md`, `lg`, `xl` (integer) - the width at various breakpoints
  * `align` (`'start'`, `'end'`, `'center'`, `'baseline'` or `'stretch'`) - flex alignment


**Example**

```jsx
const MyGrid = (props) => (
  <Container fluid>
    <Row>
      <Col xs={12} md={6}>1</Col>
      <Col xs={12} md={6}>2</Col>
    </Row>
  </Container>
);
```


### Navbar

**Navbar**

Props:
  * `bsStyle` (`'light'` or `'inverse'`)

**NavbarBrand**

No extra props.

**Example**

```jsx
const MyNavbar = (props) => (
  <Navbar>

  </Navbar>
);
```


### Password strength meter

**PasswordMeter**

Shows a strength bar with 5 segments.  As `score` increases, the length of the bar increases, and the colour changes from red to green through yellow.

Props:
  * `strength` (`0`, `1`, `2`, `3`, `4`) - the strength of the password
  * `feedback` (string) - an optional feedback message, e.g., 'too short'


**ZxcvbnMeter**

This renders the `PasswordMeter` component above, calculating `score` and `feedback` by using the [zxcvbn](https://www.npmjs.com/packages/zxcvbn)
library.

Props:
  * `password` (string) - the password to analyse


### Forms

**FormGroup**

Renders a form group, i.e., input element, label, help text, error messages, etc.

Props:
  * `type` (string) - input type, any of the standard `<input>` types plus `'textarea'`
  * `id` (string) - the input ID
  * `label` (string) - the form control label
  * `optional` (boolean) - unless true, the label will be bold with a red star after
  * `help` (string) - small, muted help text after the form control
  * `value` (any) - the value for the control
  * `optionValue` (any) - for `type='radio'`; if `value===optionValue`, the control will be checked
  * `valid` (boolean) - if validation has passed; if false, the control and label will be highlighted in red
  * `errors` (string[]) - an array of error messages for validation
  * `onChange` (function) - passed to the input control
  * `showStrength` (boolean) - if true, a `ZxcvbnMeter` will be shown underneath the control
  * `inline` (boolean) - if true, adds `form-check-inline`


### Buttons

**triggerKey(key?: string)**

Decorator which triggers the click event on an element when the specified key is pressed.  The key can either be specified as an argument to the decorator or as the prop `triggerKey`.

**ClickTarget**

Renders one of `<a>`, `<button>`, `<Link>` (from `react-router-dom`) or `<div>`, depending on supplied props.

Props:
  * `href` (string) - supply to get an `a` link
  * `onClick` (function) - supply to get a `button`
  * `to` (string) - supply to get a `Link`
  * `triggerKey` - for `triggerKey` decorator above

If none of the above are specified, defaults to a `div`.


**Button**

As above, but adds bootstrap button styling.

Props:
  * all `ClickTarget` props
  * `bsStyle` - (`'primary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, or `'default'`) - the style of the button
  * `submit` - true if the button is to be a submit button
  * `fab` - true to make the button a Floating Action Button


### Misc

**Badge**

Props:
  * `bsStyle` (`'primary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, or `'default'`) - the style of the badge
  * `pill` (boolean) - true to make the badge a pill


**Icon**

Render a Font Awesome icon.

Props:
  * `fa` (string, one of the Font Awesome icon names) - the icon to render
