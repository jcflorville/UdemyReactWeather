import React, { Component } from 'react';
import { connect } from "react-redux";
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
	
	renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp)
		const pressures = cityData.list.map(weather => weather.main.pressure)
		const humidities = cityData.list.map(weather => weather.main.humidity)
		const { lon, lat } = cityData.city.coord;

		console.log(lon)
		console.log(lat)

		return (
			<tr key={name}>
				<td scope="row"><GoogleMap lon={lon} lat={lat} /></td>
				<td><Chart data={temps} color="orange" units="K" /></td>
				<td><Chart data={pressures} color="green" units="hPa" /></td>
				<td><Chart data={humidities} color="black" units="%" /></td>
			</tr>
		)
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">City</th>
						<th scope="col">Temperature (K)</th>
						<th scope="col">Pressure (hPa)</th>
						<th scope="col">Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		)
	}
}

function mapStateToProps(state) {
	return  { weather: state.weather }
}
// Another option, more simple
// function mapStateToProps({ weather }) {
// 	// { weather } is like const weather = weather;
// 	return  { weather } // is identical to return  { weather: weather }
// }

export default connect(mapStateToProps)(WeatherList)

