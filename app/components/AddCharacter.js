var React = require('react');

var AddCharacter = React.createClass({

  getInitialState: function() {
    return {
      name: '',
      gender: '',
      helpBlock: ''
    }
  },

  handleNameChange: function(event) {
    this.refs.nameFormGroup.getDOMNode().classList.remove('has-error');
    this.refs.nameFormGroup.getDOMNode().classList.remove('has-success');
    this.setState({ name: event.target.value, helpBlock: '' });
  },

  handleGenderChange: function(event) {
    this.refs.genderFormGroup.getDOMNode().classList.remove('has-error');
    this.setState({ gender: event.target.value })
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    if (!name) {
      this.refs.nameInput.getDOMNode().focus();
      this.refs.nameFormGroup.getDOMNode().classList.add('has-error');
      return;
    }

    if (!gender) {
      this.refs.genderFormGroup.getDOMNode().classList.add('has-error');
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    })
      .done(function() {
        this.refs.nameFormGroup.getDOMNode().classList.add('has-success');
        this.setState({ helpBlock: jqXhr.responseJSON.message });
      }.bind(this))
      .fail(function(jqXhr) {
        this.refs.nameFormGroup.getDOMNode().classList.add('has-error');
        this.setState({ helpBlock: jqXhr.responseJSON.message });
      }.bind(this))
      .always(function() {
        this.setState({ name: '', gender: '' });
        this.refs.nameInput.getDOMNode().focus();
      }.bind(this));
  },

  render: function() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Character</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group' ref='nameFormGroup'>
                    <label className='control-label'>Character Name</label>
                    <input type='text' className='form-control' ref='nameInput' value={this.state.name} onChange={this.handleNameChange} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className='form-group ' ref='genderFormGroup'>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='female' value='female' checked={this.state.gender === 'female'} onChange={this.handleGenderChange}/>
                      <label htmlFor='female'>Female</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='male' value='male' checked={this.state.gender === 'male'} onChange={this.handleGenderChange}/>
                      <label htmlFor='male'>Male</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddCharacter;