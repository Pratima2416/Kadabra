import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import searchIcon from '../assets/search-icon.svg';

import './Travelgateway.css';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';

const { Handle } = Slider;

const TravelGateways = () => {

  const navigate = useNavigate();

  const [showNewContent, setShowNewContent] = useState(false);

  const [step, setStep] = useState(0); // Track the current step

  // State for the range input
  const [rangeValue, setRangeValue] = useState([1000, 100000]);

  // State to keep track of the selected destination type
  const [selectedTab, setSelectedTab] = useState('arts-culture');

  // State for testimonials
  const [startIndex, setStartIndex] = useState(0);

  const [tripType, setTripType] = useState('round-trip');

  const [startDate, setStartDate] = useState(null); // State for round trip date
  const [endDate, setEndDate] = useState(null); // State for end trip date

  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle Next button click
  const handleNextClick = () => {
    setStep(step + 1);
  };

  // Data for arts & culture destinations
  const artsCultureDestinations = [
    { city: 'Phoenix', country: 'Arizona' },
    { city: 'San Francisco', country: 'California' },
    { city: 'Keswick', country: 'England' },
    { city: 'Hot Springs', country: 'Arkansas' },
    { city: 'Barcelona', country: 'Catalonia' },
    { city: 'London', country: 'England' },
    { city: 'Los Angeles', country: 'California' },
    { city: 'Prague', country: 'Czechia' },
    { city: 'Scarborough', country: 'England' },
    { city: 'San Diego', country: 'California' },
    { city: 'Washington', country: 'District of Columbia' },
  ];

  // Testimonials data
  const testimonials = [
    { text: "“Amazing experience I have here. Thanks Travel Surity”", author: "Jasmin Ahuja" },
    { text: "“Great service, recommended place, love all”", author: "Manjeet Singh" },
    { text: "“Trip planning made easy”", author: "Robert Mathew" },
  ];

  const testimonialsToShow = 3; // Number of testimonials to show at a time

  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Function to handle click on a destination
  const handleDestinationClick = (destination) => {
    console.log(`You clicked on ${destination.city}, ${destination.country}`);
  };

  // Functions for testimonials slider
  const handlePrevTestimonial = () => {
    setStartIndex((prevIndex) => (prevIndex <= 0 ? testimonials.length - testimonialsToShow : prevIndex - 1));
  };

  const handleNextTestimonial = () => {
    setStartIndex((prevIndex) => (prevIndex >= testimonials.length - testimonialsToShow ? 0 : prevIndex + 1));
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate('/login');  // Redirect to the login page
  };

  // Function to handle range input changes
  const handleRangeChange = (value) => {
    setRangeValue(value);
  };

  const handleGetStartedClick = () => {
    setShowNewContent(true);
  };

  const handleTripTypeClick = (type) => {
    setTripType(type);
  };

  // Handlers for calendar date changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Handle changes to traveler input
  const handleTravelerChange = (type, value) => {
    setTravelers(prevState => ({
      ...prevState,
      [type]: Math.max(0, Number(value)), // Ensure value is not negative
    }));
  };

  const increment = (type) => {
    setTravelers(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1, // No upper limit
    }));
  };

  const decrement = (type) => {
    setTravelers(prevState => ({
      ...prevState,
      [type]: Math.max(0, prevState[type] - 1), // Ensure value is not negative
    }));
  };

  const handleSelection = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter(item => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="travel-gateway-body">
      <header className="travel-header">
        <div className="travel-label">
          <a href="#">Home</a>
          <a href="#">Hotel</a>
          <a href="#">Flight</a>
          <a href="#">Destination</a>
          <a href="#">Pages</a>
        </div>
        <div className="travel-buttons">
          <button className="travel-explorer-btn">Become an Explorer</button>
          <button className="travel-login-btn" onClick={handleLoginClick}>Login</button>
        </div>
      </header>

      {/* Blue heading */}
      <section className="blue-heading-container">
        <h2 className="blue-heading">Plan Your Cab Rides Smartly and Save Money!</h2>
      </section>

      {/* Light Blue Container */}
      <section className="budget-planner-container">
        <h1 className="heading">Kadabra Budget Planner</h1>
        <h2 className="subheading">Welcome to the AI budget planner for cab booking</h2>
        {step === 0 && (
          <>
            <h3 className="blue-subheading">Why Choose Our AI Budget Planner?</h3>
            <div className="blue-paragraph-container">
              <p className="blue-paragraph">
                Intelligent Budgeting: Our AI algorithm analyzes your cab booking habits and helps you plan your budget efficiently. <br />
                Cost Optimization: Get the best deals and discounts tailored to your travel needs.<br />
                Expense Tracking: Keep track of your expenses and manage your finances better.<br />
                Convenience: Easy-to-use interface for hassle-free budgeting.<br />
              </p>
            </div>
            <div className="button-container">
              <button className="get-started-btn" onClick={handleNextClick}>
                Let's get started
              </button>
            </div>
          </>
        )}
        {step === 1 && (
          <div className="new-content-container">
            <div className="white-container left-container">
              <h4>Lets Plan Your Trip!</h4>
              <h5 className="starting-at-heading">Price in range</h5>
              <div className="range-slider-container">
                <Slider
                  range
                  min={1000}
                  max={100000}
                  step={1000}
                  value={rangeValue}
                  onChange={setRangeValue}
                  className="price-range-slider"
                />
                <div className="range-values">
                  <span className="range-value min-value">{rangeValue[0]}</span>
                  <span className="range-value max-value">{rangeValue[1]}</span>
                </div>
              </div>
              {/* New "Starting at" heading */}
              <h5 className="starting-at-heading">Starting at</h5>
              {/* Location search bar directly below the heading */}
              <div className="location-search-wrapper">
                <span className="search-icon">
                  <img src={searchIcon} alt="Search" />
                </span>
                <input
                  type="text"
                  placeholder="Where would you go"
                  className="location-search-input"
                />
              </div>
              <h5 className="starting-at-heading">Going to</h5>
              {/* Location search bar directly below the heading */}
              <div className="location-search-wrapper">
                <span className="search-icon">
                  <img src={searchIcon} alt="Search" />
                </span>
                <input
                  type="text"
                  placeholder="Alaska"
                  className="location-search-input"
                />
              </div>
              <div className="trip-buttons">
                <button
                  className={`trip-btn ${tripType === 'round-trip' ? 'active' : ''}`}
                  onClick={() => handleTripTypeClick('round-trip')}
                >
                  ROUND-TRIP
                </button>
                <button
                  className={`trip-btn ${tripType === 'one-way' ? 'active' : ''}`}
                  onClick={() => handleTripTypeClick('one-way')}
                >
                  ONE-WAY
                </button>
              </div>
              <div className="next-step-container">
                <button className="Next-step" onClick={handleNextClick}>Next</button>
              </div>
            </div>
            <div className="white-container right-container">
              {/* Right container content */}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="calendars-container">
            <h3>When are you travelling ?</h3>
            <div className="calendar-wrapper">
              <div className="calendar-item">
                <div className="round-trip-date">Set the round trip date</div>
                <div className="date-display-box">
                  <p>{startDate ? startDate.toLocaleDateString() : 'Start Date'}</p>
                </div>
                <Calendar onChange={handleStartDateChange} />
              </div>

              <div className="calendar-item">
                <div className="end-trip-date">Set the end trip date</div>
                <div className="date-display-box">
                  <p>{endDate ? endDate.toLocaleDateString() : 'End Date'}</p>
                </div>
                <Calendar onChange={handleEndDateChange} />
              </div>
            </div>
            <div className="next-step-container2">
              <button className="Next-step2" onClick={handleNextClick}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: who will be travelling */}
        {step === 3 && (
          <div className="travelers-container">
            <h3>Who will be travelling?</h3>
            <p className="crew-recommendation-text">Add Your Crew and We'll Recommend Attractions for the Whole Group</p>

            <div className="travelers-form">
              <div className="traveler-input">
                <div className="label-container">
                  <label htmlFor="adults">Adults</label>
                  <p className="age-info">Age 16 or above</p>
                </div>
                <div className="number-input-container">
                  <button onClick={() => decrement('adults')}>-</button>
                  <input
                    id="adults"
                    type="number"
                    min="1"
                    value={travelers.adults}
                    onChange={(e) => handleTravelerChange('adults', e.target.value)}
                  />
                  <button onClick={() => increment('adults')}>+</button>
                </div>
              </div>
              <hr className="divider" />

              <div className="traveler-input">
                <div className="label-container">
                  <label htmlFor="children">Children</label>
                  <p className="age-info">Age 16 or above</p>
                </div>
                <div className="number-input-container">
                  <button onClick={() => decrement('children')}>-</button>
                  <input
                    id="children"
                    type="number"
                    min="0"
                    value={travelers.children}
                    onChange={(e) => handleTravelerChange('children', e.target.value)}
                  />
                  <button onClick={() => increment('children')}>+</button>
                </div>
              </div>
              <hr className="divider" />

              <div className="traveler-input">
                <div className="label-container">
                  <label htmlFor="infants">Adults</label>
                  <p className="age-info">Age 16 or above</p>
                </div>
                <div className="number-input-container">
                  <button onClick={() => decrement('infants')}>-</button>
                  <input
                    id="infants"
                    type="number"
                    min="0"
                    value={travelers.infants}
                    onChange={(e) => handleTravelerChange('infants', e.target.value)}
                  />
                  <button onClick={() => increment('infants')}>+</button>
                </div>
              </div>
              <hr className="divider" />
            </div>

            <div className="next-step-container2">
              <button className="Next-step2" onClick={handleNextClick}>Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="Locations">
            <h3>Where do you want to stay?</h3>
            <p className="crew-recommendation-text">Choose your preferred type of accommodation for your destination</p>
            <h4 className="Near-location">Near by Location</h4>

            <div className="selection-buttons">
              <button
                className={`selection-button ${selectedOptions.includes('Most popular places') ? 'selected' : ''}`}
                onClick={() => handleSelection('Most popular places')}
              >
                Most popular places
              </button>
              <button
                className={`selection-button ${selectedOptions.includes('Hotels & Motels') ? 'selected' : ''}`}
                onClick={() => handleSelection('Hotels & Motels')}
              >
                Hotels & Motels
              </button>
              <button
                className={`selection-button ${selectedOptions.includes('Boutique stays') ? 'selected' : ''}`}
                onClick={() => handleSelection('Boutique stays')}
              >
                Boutique stays
              </button>
              <button
                className={`selection-button ${selectedOptions.includes('No Recommendation') ? 'selected' : ''}`}
                onClick={() => handleSelection('No Recommendation')}
              >
                No Recommendation
              </button>
              <button
                className={`selection-button ${selectedOptions.includes('cabins & cottages') ? 'selected' : ''}`}
                onClick={() => handleSelection('cabins & cottages')}
              >
                cabins & cottages
              </button>
              <button
                className={`selection-button ${selectedOptions.includes('Track Camping') ? 'selected' : ''}`}
                onClick={() => handleSelection('Track Camping')}
              >
                Track Camping
              </button>
            </div>

            <button className="Generate" onClick={handleNextClick}>Generate Plans</button>

          </div>
        )}

        {step === 5 && (
          <div className="plans">
            <div className="payment-button">
              <h3 className="results">Result</h3>
            </div>

            <div className="When-to-go">
              <h3 className="when-to-go">When to go</h3>
              <div className="option">
                <div className="text-container">
                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="When-to-go">
              <h3 className="when-to-go">When to go</h3>
              <div className="option">
                <div className="text-container">
                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="When-to-go">
              <h3 className="when-to-go">When to go</h3>
              <div className="option">
                <div className="text-container">
                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Travel in the off season</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>

                  <div className="text-arrow">
                    <div>
                      <p className="main-text">Book last minute</p>
                      <span className="save-text">Save up to 90%</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button className="payment">Continue Payment</button>
            </div>
          </div>
        )}

      </section>

      {/* Testimonial Section*/}
      <section className="travel-testimonials">
        <button className="testimonial-arrow left-arrow" onClick={handlePrevTestimonial}>
          &#9664; {/* Left arrow character */}
        </button>
        <div className="travel-testimonials-container">
          <div className="travel-testimonials-cards">
            {testimonials.slice(startIndex, startIndex + testimonialsToShow).map((testimonial, index) => (
              <div className="travel-testimonial-card" key={index}>
                <div className="testimonial-text">
                  <p>{testimonial.text}</p>
                </div>
                <span className="author-name">{testimonial.author}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="testimonial-arrow right-arrow" onClick={handleNextTestimonial}>
          &#9654; {/* Right arrow character */}
        </button>
      </section>

      <h3 className="travel-inspiration-heading">
        Inspiration for future gateways packages
      </h3>

      {/* Packages Section */}
      <section className="travel-packages">
        <ul className="travel-destinations-list">
          <li
            className={selectedTab === 'arts-culture' ? 'active' : ''}
            onClick={() => handleTabClick('arts-culture')}
          >
            Destinations for arts & culture
          </li>
          <li
            className={selectedTab === 'outdoor-adventure' ? 'active' : ''}
            onClick={() => handleTabClick('outdoor-adventure')}
          >
            Destinations for outdoor adventure
          </li>
          <li
            className={selectedTab === 'mountain-cabins' ? 'active' : ''}
            onClick={() => handleTabClick('mountain-cabins')}
          >
            Mountain cabins
          </li>
          <li
            className={selectedTab === 'beach-destinations' ? 'active' : ''}
            onClick={() => handleTabClick('beach-destinations')}
          >
            Beach destinations
          </li>
          <li
            className={selectedTab === 'popular-destinations' ? 'active' : ''}
            onClick={() => handleTabClick('popular-destinations')}
          >
            Popular destinations
          </li>
          <li
            className={selectedTab === 'unique-stays' ? 'active' : ''}
            onClick={() => handleTabClick('unique-stays')}
          >
            Unique stays
          </li>
        </ul>
        <div className="travel-destinations-grid">
          {selectedTab === 'arts-culture' &&
            artsCultureDestinations.map((destination, index) => (
              <div
                key={index}
                className="clickable-destination"
                onClick={() => handleDestinationClick(destination)}
              >
                <span className="destination-city">{destination.city}</span>
                <span className="destination-country">{destination.country}</span>
              </div>
            ))}
          {selectedTab !== 'arts-culture' && (
            <div className="travel-see-more">
              <a href="#">See more</a>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <div className="travel-footer">
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety information</a></li>
            <li><a href="#">Cancellation options</a></li>
            <li><a href="#">Our COVID-19 Response</a></li>
            <li><a href="#">Supporting people with disabilities</a></li>
            <li><a href="#">Report a neighborhood concern</a></li>
          </ul>
        </div>
        <div>
          <h4>Packages</h4>
          <ul>
            <li><a href="#">Budget Package</a></li>
            <li><a href="#">Package by days</a></li>
            <li><a href="#">Honeymoon package</a></li>
            <li><a href="#">Family Trip</a></li>
            <li><a href="#">Get Away Package</a></li>
          </ul>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li><a href="#">Newsroom</a></li>
            <li><a href="#">Learn about new features</a></li>
            <li><a href="#">Letter from our founders</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TravelGateways;
