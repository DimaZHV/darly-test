import { useState } from "react";
import "./FormInput.scss";

interface Table {
	title: string;
	body: string;
	surname: string;
	name: string;
	email: string;
}

interface Props {
	fetchData: (data: Table) => void;
	enterDataSetter: () => void;
}

function FormInput({ fetchData, enterDataSetter }: Props) {
	const [listOfInputs, setListOfInputs] = useState<Table>({
		title: "",
		body: "",
		name: "",
		surname: "",
		email: "",
	});

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			listOfInputs.body &&
			listOfInputs.name.length > 3 &&
			listOfInputs.surname.length > 4 &&
			listOfInputs.email &&
			listOfInputs.body
		) {
			setListOfInputs({
				title: "",
				body: "",
				name: "",
				surname: "",
				email: "",
			});
			fetchData(listOfInputs);
			enterDataSetter();
		}
	};

	return (
		<div className="form_input">
			<form
				onSubmit={(e) => {
					submitHandler(e);
				}}
				action=""
			>
				<div className="inputs_block">
					<label htmlFor="name">
						<span>NAME:</span>
						<input
							onChange={(e) =>
								setListOfInputs({
									...listOfInputs,
									name: e.currentTarget.value,
								})
							}
							type="text"
							name=""
							required
							id="name"
							value={listOfInputs.name}
						/>
					</label>

					<label htmlFor="surname">
						<span>SURNAME:</span>
						<input
							onChange={(e) =>
								setListOfInputs({
									...listOfInputs,
									surname: e.currentTarget.value,
								})
							}
							type="text"
							required
							name=""
							id="surname"
							value={listOfInputs.surname}
						/>
					</label>

					<label htmlFor="title">
						<span>TITLE:</span>
						<input
							onChange={(e) =>
								setListOfInputs({
									...listOfInputs,
									title: e.currentTarget.value,
								})
							}
							type="text"
							required
							name=""
							id="title"
							value={listOfInputs.title}
						/>
					</label>

					<label htmlFor="body">
						<span>BODY:</span>
						<input
							onChange={(e) =>
								setListOfInputs({
									...listOfInputs,
									body: e.currentTarget.value,
								})
							}
							type="text"
							required
							name=""
							id="body"
							value={listOfInputs.body}
						/>
					</label>

					<label htmlFor="email">
						<span>EMAIL:</span>
						<input
							onChange={(e) =>
								setListOfInputs({
									...listOfInputs,
									email: e.currentTarget.value,
								})
							}
							type="email"
							required
							name=""
							id="email"
							value={listOfInputs.email}
						/>
					</label>
				</div>
				<div className="buttons">
					<input type="submit" value="Submit" />
					<input onClick={enterDataSetter} type="button" value="Cancel" />
				</div>
			</form>
		</div>
	);
}
export default FormInput;
