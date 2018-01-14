import React, { Component } from "react";

// COMPONENTS
import { Row, Col, Card, Popover, Collapse } from "antd";
import { DietCalculator } from "./components"

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	render() {
		return (
			<div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
				<Row>
					<Col span={24} style={{ color: "white", marginTop: "20vh" }}>
						<h1 style={{ color: "white", fontSize: "3em" }}>
								Daily Diet Calculator
						</h1>
						<Collapse bordered={false} style={{ marginBottom: "10px" }}>
							<Collapse.Panel header="Requirements">
							<p>
								Write a program that allows the user to <b>select</b> the following criteria: <b>gender, age, and category.</b>

								<br /><br />

								<Popover title="Comment" content={(
									<p>
										I assume that this requirement wants me to show a random
										selection of foods for breakfast, lunch, and dinner. Sadly
										there is no field in the dataset to identify which type of
										meal the food falls into.

										My solution is to just randomize a food and place them into
										the seperate meal types.
									</p>
								)}>
									<a>
										<p>
											Upon selecting, the user will view a list of foods and serving sizes that represent
											a balanced diet for <b>a day</b>.
										</p>
									</a>
								</Popover>

								Present a <b>random lists</b> that fulfills this criteria, and allow the user to
								request alternative lists (that fulfill the criteria) from the program.
							</p>
							</Collapse.Panel>
						</Collapse>
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<Card bordered={false}>
							<DietCalculator />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
