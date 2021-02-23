import {TextInput, TextArea, Button, onSubmit, ListErrors} from '/components/form'
import {routeTo} from '/components/router'
import {url} from '/utils/url'
import {store} from '/store'

export const Settings = () => {
  const form = {
    name: 'Settings',
    url: url('api.me'),
    clearOnSuccess: true,
    prepareData: user => ({user}),
    onSuccess: ({user}) => {
      console.log('settings!', user)
      setListItem(comment)
    },
    onError: (err) => {
      console.error('settings error', err)
    }
  }
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>

            <h1 className='text-xs-center'>Your Settings</h1>

            <ListErrors formName={form.name}/>

            <form onSubmit={onSubmit(form)}>
              <fieldset>

                <fieldset className="form-group">
                  <TextInput
                    name='image'
                    formName={form.name}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <TextInput
                    name='username'
                    formName={form.name}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <TextArea
                    name='bio'
                    formName={form.name}
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <TextInput
                    name='email'
                    formName={form.name}
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <TextInput
                    name='password'
                    formName={form.name}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>

                <Button
                  formName={form.name}
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </Button>

              </fieldset>
            </form>


            {/* <SettingsForm */}
            {/*   currentUser={this.props.currentUser} */}
            {/*   onSubmitForm={this.props.onSubmitForm} /> */}

            <hr />

            <button
              className='btn btn-outline-danger'
              type='button'
              onClick={() => {
                routeTo(url('home'))
                localStorage.clear()
                store.init()
              }}
            >
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}