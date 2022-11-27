import React from "react";
import "./MainBlock.scss";
import FormInput from "../FormInput/FormInput";
import { useState, useEffect } from "react";
import TableBlock from "../Table/TableBlock";

interface Table {
	title: string;
	body: string;
	surname: string;
	name: string;
	email: string;
}
function MainBlock() {
	const [data, setData] = useState<Table[]>([
		{ title: "", body: "", name: "", surname: "", email: "" },
	]);
	const [enterData, setEnterData] = useState<boolean>(false);
	const [randomRow, setRandomRow] = useState<number>(0);
	const [position, setPosition] = useState<boolean>(true);
	const [checkRows, setCheckRows] = useState<[]>();

	useEffect(() => {
		const row = getRandomInt(5, 15);
		setRandomRow(row);
	}, []);

	useEffect(() => {
		if (position) {
			fetch("http://localhost:3004/users")
				.then((res) => res.json())
				.then((res) => {
					setCheckRows(res);
					return res;
				})
				.then((res) => res.splice(0, randomRow))
				.then((res) => {
					setData(res);
					setRandomRow(randomRow + 5);
				})
				.catch((error: Error) =>
					console.log("Sorry, something goes wrong! " + error.message)
				)
				.finally(() => setPosition(false));
		}
	}, [position, randomRow]);

	useEffect(() => {
		document.addEventListener("scroll", scrollHandler);
		return () => {
			document.removeEventListener("scroll", scrollHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position]);

	const scrollHandler = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			checkRows?.length !== 0
		) {
			setPosition(true);
		}
	};

	const enterDataSetter = () => {
		setEnterData(!enterData);
	};

	const fetchData = (data1: Table) => {
		fetch("http://localhost:3004/users", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data1),
		})
			.then((res) => res.json())
			.then(() => setData([...data, data1]))
			.catch((error: Error) =>
				console.log("Sorry, something goes wrong! " + error.message)
			);
	};

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	return (
		<div className="wrapper">
			<TableBlock data={data} />
			<button onClick={enterDataSetter}>Enter new data</button>
			{enterData ? (
				<FormInput fetchData={fetchData} enterDataSetter={enterDataSetter} />
			) : null}
		</div>
	);
}

export default MainBlock;
