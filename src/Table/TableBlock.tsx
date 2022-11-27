import "./TableBlock.scss";

interface Table {
	title: string;
	body: string;
	surname: string;
	name: string;
	email: string;
}

interface Props {
	data: Table[];
}

function TableBlock({ data }: Props) {
	let number = 1;

	return (
		<table className="table_data">
			<tbody>
				<tr>
					<th>ID</th>
					<th>NAME</th>
					<th>SURNAME</th>
					<th>EMAIL</th>
					<th>TITLE</th>
					<th>BODY</th>
				</tr>
				{data?.map((el: Table, index: number) => (
					<tr key={index}>
						<td>{number++}</td>
						<td>{el.name}</td>
						<td>{el.surname}</td>
						<td>{el.email}</td>
						<td>{el.title}</td>
						<td>{el.body}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default TableBlock;
