import React, { Component } from "react";

// UTILITIES
import * as Utils from "./utils.js";
import _ from "lodash";

// COMPONENTS
import { Row, Col, Form, Select, InputNumber, Card, Button } from "antd";

// DATA
import * as Data from "../../data";

export default class DietCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			data: null
		};

		this.setGender = this.setGender.bind(this);
		this.setAge = this.setAge.bind(this);
		this.setCategory = this.setCategory.bind(this);
	}

	/**
	 * The Component Will Mount function of the React App will set the necessary
	 * data set needed to perform the calculations. It will be fetched from the
	 * "data" folder found in "~/src/data".
	 */
	componentWillMount() {
		this.setState({ data: Data });
	}

	setGender(value) {
		this.setState({ gender: value })
	}

	setAge(value) {
		this.setState({ age: value })
	}

	setCategory(value) {
		this.setState({ category: value });
	}

	render() {
		const genders = ["Male", "Female"];
		const { foodgroups } = this.state.data.FoodGroups;

		return (
			<Row>
				<Col span={24}>
					<Form>
						<Form.Item colon={false} label="Gender">
							<Select onChange={this.setGender}>
								{ genders.map((gender, index) => (<Select.Option value={gender} key={index}>{gender}</Select.Option>)) }
							</Select>
						</Form.Item>

						<Form.Item colon={false} label="Age">
							<InputNumber min={0} precision={0} onChange={this.setAge} style={{ width: "100%" }}/>
						</Form.Item>

						<Form.Item colon={false} label="Category">
							<Select onChange={this.setCategory}>
							{
								foodgroups.map((foodGroup, index) => {
									foodGroup = Utils.prepareFoodGroup(foodGroup);
									return (
										<Select.Option value={foodGroup["FoodGroupID"]} key={index}>
											{foodGroup["Name"]}
										</Select.Option>
									);
								})
							}
							</Select>
						</Form.Item>
					</Form>
				</Col>
				<Col span={24}>
				{ this.renderDiet() }
				</Col>
			</Row>
		);
	}

	renderDiet() {
		const { age, gender, category } = this.state || {};

		if(age === undefined || gender === undefined || category === undefined) {
			return (<p>Make your selections!</p>);
		} else {
			// Making a "Number()" function equal to itself validates if it is of type "NaN"
			if(Number(age) === Number(age) && typeof gender === "string" && typeof category === "string") {
				const { ServingsPerDay = [] } = this.state.data || {};

				// Find a serving that matches the criteria provided by the user
				const serving = ServingsPerDay["servings to per to miy"].find(serving => {
					serving = Utils.prepareServing(serving);
					return category === serving["FoodGroupID"] && gender === serving["Gender"] && Number(age) >= Number(serving["Ages"].match(/\d+/g)[0]) && Number(age) <= Number(serving["Ages"].match(/\d+/g)[1]);
				});

				if(!serving) {
					return (
						<span>We cannot seem to find a diet for you. Please try again.</span>
					);
				} else {
					const { Foods = [], FoodGroups = [] } = this.state.data || {};

					// If there is a matching serving found, find all the matching foods
					const foods = Foods["foods"].filter(food => {
						food = Utils.prepareFood(food);
						return food["FoodGroupID"] === Utils.prepareServing(serving)["FoodGroupID"] && _.find(_.flatMap(FoodGroups["foodgroups"], foodGroup => Utils.prepareFoodGroup(foodGroup)["Categories"]), category => category["ID"] === food["Category"]);
					});

					// If there are matching foods found, render 3 random foods
					if(foods.length > 0) {
						const mealTypes = ["🍳 Breakfast", "🍱 Lunch", "🍽️ Dinner"];
						const foodsToShow = [3];
						for(let i = 0; i < 3; i++) {
							foodsToShow[i] = foods[Math.floor(Math.random() * foods.length)];
						}

						return (
							<Row>
								<Col span={24}>
								{
									foodsToShow.map((food, index) => {
										food = Utils.prepareFood(food);
										return (
											<Card title={ mealTypes[index] || ""} style={{ marginBottom: "10px" }} key={index}>
												<Row gutter={10}>
													<Col span={24}>
														<h3>{food["Name"]}</h3>
													</Col>

													<Col span={6}>
														<b>Serving Size</b>
													</Col>
													<Col span={18}>
														<span dangerouslySetInnerHTML={{ __html: food["Serving Size"] }}></span>
													</Col>

													<Col span={6}>
														<b>Category</b>
													</Col>
													<Col span={18}>
														<span>{ _.find(_.flatMap(FoodGroups["foodgroups"], foodGroup => Utils.prepareFoodGroup(foodGroup)["Categories"]), category => category["ID"] === food["Category"])["Name"] }</span>
													</Col>
												</Row>
											</Card>
										);
									})
								}
								</Col>
								<Col span={24}>
									<Button type="primary" size="large" style={{ width: "100%" }} onClick={() => this.setState({})}>
										Try Again?
									</Button>
								</Col>
							</Row>
						);
					} else {
						return (
							<span>We cannot seem to find a diet for you. Please try again.</span>
						);
					}
				}
			}
		}
	}
}
