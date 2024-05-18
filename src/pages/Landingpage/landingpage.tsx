import React from 'react';
import  { Component } from 'react';
import { PageOne } from '../../components/landingpage/PageOne';
import { PageTwo } from '../../components/landingpage/PageTwo';

export default class LandingPage extends Component {
  render() {
    return (
      <div >
        < PageOne/>
        < PageTwo/>
      </div>
    );
  }
}
