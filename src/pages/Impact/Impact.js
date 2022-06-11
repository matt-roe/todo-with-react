import Styles from "./Styles";
import { Field } from "react-final-form";
import Wizard from "./Wizard";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const required = (value) => (value ? undefined : "Required");

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const Import = () => {return(
  <Styles>
    <h1>React Final Form Example</h1>
    <h2>Wizard Form</h2>
    <a
      href="https://final-form.org/react"
      target="_blank"
      rel="noopener noreferrer"
    >
      Read Docs
    </a>
    <p>Lets make some impact!</p>
    <Wizard
      initialValues={{}}
      onSubmit={onSubmit}
    >
      <Wizard.Page
        validate={(values) => {
          const errors = {};
          if (!values.messageType) {
            errors.messageType = "Required";
          }
          if (!values.validType) {
            errors.validType = "Required";
          }
          if (values.messageType === "messageMail") {
            if (!values.street) {
              errors.address1 = "Required";
            }
            if (!values.street) {
              errors.addressCity = "Required";
            }
            if (!values.street) {
              errors.addressState = "Required";
            }
            if (!values.street) {
              errors.addressZip = "Required";
            }
          } else if (values.messageType === "messagePhone") {
            if (!values.phone) {
              errors.phone = "Required";
            }
          } else if (values.messageType === "messageBoth") {
            if (!values.phone) {
              errors.phone = "Required";
            }
            if (!values.street) {
              errors.address1 = "Required";
            }
            if (!values.street) {
              errors.address2 = "Required";
            }
            if (!values.street) {
              errors.addressCity = "Required";
            }
            if (!values.street) {
              errors.addressState = "Required";
            }
            if (!values.street) {
              errors.addressZip = "Required";
            }
          }
          if (values.validType === "validEmail") {
            if (!values.email) {
              errors.email = "Required";
            }
          }
          if (values.samePhoneVoice === "notSamePhone" || values.messageType === "messageMail") {
            if (values.validType === "validVoice") {
              if (!values.voice) {
                errors.voice = "Required";
              }
            }
          }
          if (values.samePhoneSMS === "notSameSMS" || values.messageType === "messageMail") {
            if (values.validType === "validSMS") {
              if (!values.sms) {
                errors.sms = "Required";
              }
            }
          }
          return errors;
        }}
      >
        <div>
          <label>Message Type</label>
          <Field name="messageType" component="select">
            <option />
            <option value="messageMail">Mail</option>
            <option value="messagePhone">Phone</option>
            <option value="messageBoth">Both</option>
          </Field>
          <Error name="messageType" />
        </div>
        <Condition when="messageType" is="messageMail">
          <div>
            <label>Address 1</label>
            <Field
              name="address1"
              component="input"
              type="text"
              placeholder="Address 1"
              validate={required}
            />
            <Error name="address1" />
          </div>
          <div>
            <label>Address 2</label>
            <Field
              name="address2"
              component="input"
              type="text"
              placeholder="Address 2"
            />
            <Error name="address2" />
          </div>
          <div>
            <label>City</label>
            <Field
              name="addressCity"
              component="input"
              type="text"
              placeholder="City"
              validate={required}
            />
            <Error name="addressCity" />
          </div>
          <div>
            <label>State</label>
            <Field
              name="addressState"
              component="input"
              type="text"
              placeholder="State"
              validate={required}
            />
            <Error name="addressState" />
          </div>
          <div>
            <label>Zip</label>
            <Field
              name="addressZip"
              component="input"
              type="text"
              placeholder="Zip Code"
              validate={required}
            />
            <Error name="addressZip" />
          </div>
        </Condition>
        <Condition when="messageType" is="messagePhone">
          <div>
            <label>Phone Number</label>
            <Field
              name="phone"
              component="input"
              type="phone"
              placeholder="Phone Number"
              validate={required}
            />
            <Error name="phone" />
          </div>
        </Condition>
        <Condition when="messageType" is="messageBoth">
          <div>
            <label>Address 1</label>
            <Field
              name="address1"
              component="input"
              type="text"
              placeholder="Address 1"
              validate={required}
            />
            <Error name="address1" />
          </div>
          <div>
            <label>Address 2</label>
            <Field
              name="address2"
              component="input"
              type="text"
              placeholder="Address 2"
            />
            <Error name="address2" />
          </div>
          <div>
            <label>City</label>
            <Field
              name="addressCity"
              component="input"
              type="text"
              placeholder="City"
              validate={required}
            />
            <Error name="addressCity" />
          </div>
          <div>
            <label>State</label>
            <Field
              name="addressState"
              component="input"
              type="text"
              placeholder="State"
              validate={required}
            />
            <Error name="addressState" />
          </div>
          <div>
            <label>Zip</label>
            <Field
              name="addressZip"
              component="input"
              type="text"
              placeholder="Zip Code"
              validate={required}
            />
            <Error name="addressZip" />
          </div>
          <div>
            <label>Phone Number</label>
            <Field
              name="phone"
              component="input"
              type="phone"
              placeholder="Phone Number"
              validate={required}
            />
            <Error name="phone" />
          </div>
        </Condition>
        <div>
          <label>Validation Type</label>
          <Field name="validType" component="select">
            <option />
            <option value="validEmail">Email</option>
            <option value="validVoice">Phone Call</option>
            <option value="validSMS">SMS</option>
          </Field>
          <Error name="validType" />
        </div>
        <Condition when="validType" is="validEmail">
          <div>
            <label>Email</label>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
            <Error name="email" />
          </div>
        </Condition>
        <Condition when="validType" is="validSMS">
          <Condition when="messageType" is="messageMail">
            <div>
              <label>SMS</label>
              <Field
                name="sms"
                component="input"
                type="phone"
                placeholder="Phone Number"
              />
              <Error name="sms" />
            </div>
          </Condition>
          <Condition when="messageType" is="messagePhone">
            <div>
              <label>Same Phone?</label>
              <Field name="samePhoneSMS" component="select" type="checkbox">
                <option value="yesSameSMS">Yes</option>
                <option value="notSameSMS">No</option>
              </Field>
              <Error name="samePhoneSMS" />
            </div>
          </Condition>
          <Condition when="messageType" is="messageBoth">
            <div>
              <label>Same Phone?</label>
              <Field name="samePhoneSMS" component="select" type="checkbox">
                <option value="yesSameSMS">Yes</option>
                <option value="notSameSMS">No</option>
              </Field>
              <Error name="samePhoneSMS" />
            </div>
          </Condition>
          <Condition when="samePhoneSMS" is="notSameSMS">
            <div>
              <label>SMS</label>
              <Field
                name="sms"
                component="input"
                type="phone"
                placeholder="Phone Number"
              />
              <Error name="sms" />
            </div>
          </Condition>
        </Condition>
        <Condition when="validType" is="validVoice">
          <Condition when="messageType" is="messageMail">
            <div>
              <label>Phone Call</label>
              <Field
                name="voice"
                component="input"
                type="phone"
                placeholder="Phone Number"
              />
              <Error name="voice" />
            </div>
          </Condition>
          <Condition when="messageType" is="messagePhone">
            <div>
              <label>Same Phone?</label>
              <Field name="samePhoneVoice" component="select" type="checkbox">
                <option value="yesSamePhone">Yes</option>
                <option value="notSamePhone">No</option>
              </Field>
              <Error name="samePhoneVoice" />
            </div>
          </Condition>
          <Condition when="messageType" is="messageBoth">
            <div>
              <label>Same Phone?</label>
              <Field name="samePhoneVoice" component="select" type="checkbox">
                <option value="yesSamePhone">Yes</option>
                <option value="notSamePhone">No</option>
              </Field>
              <Error name="samePhoneVoice" />
            </div>
          </Condition>
          <Condition when="samePhoneVoice" is="notSamePhone">
            <div>
              <label>Phone Call</label>
              <Field
                name="voice"
                component="input"
                type="phone"
                placeholder="Phone Number"
              />
              <Error name="voice" />
            </div>
          </Condition>
        </Condition>
      </Wizard.Page>
      <Wizard.Page>
        <div>
          <label>First Name</label>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            validate={required}
          />
          <Error name="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            validate={required}
          />
          <Error name="lastName" />
        </div>
        <div>
          <label>Your Story</label>
          <Field
            name="story"
            component="textarea"
            type="text"
            placeholder="Your Story"
            validate={required}
          />
          <Error name="story" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={(values) => {
          const errors = {};
          if (!values.toppings) {
            errors.toppings = "Required";
          } else if (values.toppings.length < 2) {
            errors.toppings = "Choose more";
          }
          return errors;
        }}
      >
        <div>
          <label>Employed?</label>
          <Field name="employed" component="input" type="checkbox" />
        </div>
        <div>
          <label>Toppings</label>
          <Field name="toppings" component="select" multiple>
            <option value="ham">🐷 Ham</option>
            <option value="mushrooms">🍄 Mushrooms</option>
            <option value="cheese">🧀 Cheese</option>
            <option value="chicken">🐓 Chicken</option>
            <option value="pineapple">🍍 Pinapple</option>
          </Field>
          <Error name="toppings" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={(values) => {
          const errors = {};
          if (!values.notes) {
            errors.notes = "Required";
          }
          return errors;
        }}
      >
        <div>
          <label>Best Stooge?</label>
          <div>
            <label>
              <Field
                name="stooge"
                component="input"
                type="radio"
                value="larry"
              />{" "}
              Larry
            </label>
            <label>
              <Field name="stooge" component="input" type="radio" value="moe" />{" "}
              Moe
            </label>
            <label>
              <Field
                name="stooge"
                component="input"
                type="radio"
                value="curly"
              />{" "}
              Curly
            </label>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <Field name="notes" component="textarea" placeholder="Notes" />
          <Error name="notes" />
        </div>
      </Wizard.Page>
    </Wizard>
  </Styles>
)};

export default Import;