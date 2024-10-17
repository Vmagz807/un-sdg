/**
 * Copyright 2024 Vmagz807
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `un-sdg`
 * 
 * @demo index.html
 * @element un-sdg
 */

//goalData sets the count for colorOnly boolean
const goalData = [
  {name: 'No Poverty'},
  {name: 'Zero Hunger'},
  {name: 'Good Health and Well-being'},
  {name: 'Quality Education'},
  {name: 'Gender Equality'},
  {name: 'Clean Water and Sanitation'},
  {name: 'Affordable and Clean Energy'},
  {name: 'Decent Work and Economic Growth'},
  {name: 'Industry, Innovation and Infrastructure'},
  {name: 'Reduced Inequalities'},
  {name: 'Sustainable Cities and Communities' },
  {name: 'Responsible Consumption and Production'},
  {name: 'Climate Action'},
  {name: 'Life Below Water'},
  {name: 'Life on Land'},
  {name: 'Peace, Justice and Strong Institutions'},
  {name: 'Partnerships for the Goals'}
];

export class unSdg extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "un-sdg";
  }
  
  constructor() {
    
    //Constructors for un-svg app
    super();
    this.goal = '1';
    this.label = '';
    this.alt = '';
    this.colorOnly = false;
    this._currentSrc = '';
  }

  // All properties for app
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 
      'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    };
  }

  // Define styles
  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 10px;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      
      .color-only{
        width: 100%;
        height: 100%;
      }
    `;
  }

  //changes image when updated
  updated(changedProperties){
    if(changedProperties.has('goal')){
      this.updateGoalImage();
    }
  }

  //Updates image based on current goal
  updateGoalImage(){

    //Checks if goal is 'all' 
    if(this.goal === 'all'){

      //Sets img src for 'all' and changes alt text and name accordingly
      this._currentSrc = new URL(`../lib/svgs/goal-all.svg`, import.meta.url).href;
      this.alt = 'All Sustainable Development Goals';
    }

    //Checks if goal is circle
    else if(this.goal === 'circle'){

      //Sets img src for 'circle' and changes alt text and name accordingly
      this._currentSrc = new URL('../lib/svgs/goal-circle.svg', import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle';
    }

    //Checks for other possibilities
    else{

      //convert goal to number
      const goalNumber = parseInt(this.goal);

      //Checks if goal number is valid between 1 and 17
      if(goalNumber >= 1 && goalNumber <=17){
        
        //sets img source for specified goal and changes alt text with goal number and name
        this._currentSrc = new URL(`../lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber-1].name}`;
      }
    }
  }

  // Lit render the HTML
  render() {

    //Rendering background color for changed goal
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);

      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: var(--un-sdg-goal-${goalNumber});"></div>`;
      }
    }

    //Rendering all images
    return html`
    <img
      src="${this._currentSrc}"
      alt="${this.label || this.alt}"
      loading="lazy"
      fetchpriority="low"
    />
  `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);