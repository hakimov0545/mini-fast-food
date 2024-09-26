import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useNavigate } from "react-router-dom";

export function NotFound({
	code = 404,
	description,
	onBack,
}: {
	code?: ResultStatusType;
	description?: string;
	onBack?: () => void;
}) {
	const navigate = useNavigate();

	const translatedDescription = description || "sahifa topilmadi";

	return (
		<div
			style={{
				minHeight: "90vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "12px",
			}}
		>
			<Result
				status={`${code}`}
				title={`${code}`}
				subTitle={translatedDescription}
				extra={
					<Button
						type="primary"
						onClick={() =>
							(onBack && onBack()) || navigate("/")
						}
					>
						{"Bosh sahifaga qaytish"}
					</Button>
				}
			/>
		</div>
	);
}
