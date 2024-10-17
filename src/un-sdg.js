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

//All Svg Images and other data
const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href,
  },
  { name: 'Zero Hunger', 
    color: '#dda63a',
    image: new URL('../lib/svgs/goal-2.svg', import.meta.url).href,
  },
  { name: 'Good Health and Well-being', 
    color: '#4c9f38', 
    image: new URL('../lib/svgs/goal-3.svg', import.meta.url).href,
  },
  { name: 'Quality Education', 
    color: '#c5192d',
    image: new URL('../lib/svgs/goal-4.svg', import.meta.url).href,
  },
  { name: 'Gender Equality', 
    color: '#ff3a21',
    image: new URL('../lib/svgs/goal-5.svg', import.meta.url).href,
  },
  { name: 'Clean Water and Sanitation', 
    color: '#26bde2',
    image: new URL('../lib/svgs/goal-6.svg', import.meta.url).href,
  },
  { name: 'Affordable and Clean Energy', 
    color: '#fcc30b',
    image: new URL('../lib/svgs/goal-7.svg', import.meta.url).href,
  },
  { name: 'Decent Work and Economic Growth', 
    color: '#a21942',
    image: new URL('../lib/svgs/goal-8.svg', import.meta.url).href,
  },
  { name: 'Industry, Innovation and Infrastructure', 
    color: '#fd6925',
    image: new URL('../lib/svgs/goal-9.svg', import.meta.url).href,
  },
  { name: 'Reduced Inequalities', 
    color: '#dd1367',
    image: new URL('../lib/svgs/goal-10.svg', import.meta.url).href,
  },
  { name: 'Sustainable Cities and Communities', 
    color: '#fd9d24',
    image: new URL('../lib/svgs/goal-11.svg', import.meta.url).href,
  },
  { name: 'Responsible Consumption and Production', 
    color: '#bf8b2e',
    image: new URL('../lib/svgs/goal-12.svg', import.meta.url).href,
  },
  { name: 'Climate Action', 
    color: '#3f7e44',
    image: new URL('../lib/svgs/goal-13.svg', import.meta.url).href,
  },
  { name: 'Life Below Water', 
    color: '#0a97d9',
    image: new URL('../lib/svgs/goal-14.svg', import.meta.url).href,
  },
  { name: 'Life on Land', 
    color: '#56c02b',
    image: new URL('../lib/svgs/goal-15.svg', import.meta.url).href,
  },
  { name: 'Peace, Justice and Strong Institutions', 
    color: '#00689d',
    image: new URL('../lib/svgs/goal-16.svg', import.meta.url).href,
  },
  { name: 'Partnerships for the Goals', 
    color: '#19486a',
    image: new URL('../lib/svgs/goal-17.svg', import.meta.url).href,
  },
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
    this._currentColor = '';
  }

  // All properties for app
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      _currentColor: { type: String},
      alt: { type: String },
      title: { type: String },
    };
  }

  // Define styles
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: relative;
        z-index: 1;
      }
      .color-background{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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
      this._currentColor = '';
    }

    //Checks if goal is circle
    else if(this.goal === 'circle'){

      //Sets img src for 'circle' and changes alt text and name accordingly
      this._currentSrc = new URL('../lib/svgs/goal-circle.svg', import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle';
      this._currentColor = '';
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
        this._currentColor = goalData[goalNumber -1].color;
      }
    }
  }

  // Lit render the HTML
  render() {

    //Rendering image with background-color
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