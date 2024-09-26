import { Button, Layout, Result } from "antd";
import React, { useEffect } from "react";

interface ErrorBoundaryContainerProps {
	children: React.ReactNode;
}

interface ErrorBoundaryContainerState {
	hasError: boolean;
	error?: Error;
	errorInfo?: unknown;
}

export class ErrorBoundaryContainer extends React.Component<
	ErrorBoundaryContainerProps,
	ErrorBoundaryContainerState
> {
	constructor(props: ErrorBoundaryContainerProps) {
		super(props);
		
		this.state = { hasError: false, error: undefined };
	}
	
	static getDerivedStateFromError(
		error: unknown,
		errorInfo: unknown
	) {
		// Update state so the next render will show the fallback UI
		
		return { hasError: true, error, errorInfo };
	}
	
	componentDidCatch(error: unknown, errorInfo: unknown) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}
	
	render() {
		if (this.state.hasError) {
			return <ErrorFallback error={this.state.error} />;
		}
		
		return this.props.children;
	}
}

const ErrorFallback = ({ error }: { error?: Error }) => {
	// const { createErrorLog } = useCreateErrorLog({}, {});
	
	useEffect(() => {
		if (document.URL.includes("localhost:")) return;
		console.log({
			text: error?.message,
			path: location.pathname,
			desc: error?.stack,
		});
		// createErrorLog({ text: error?.message, path: location.pathname, desc: error?.stack });
	}, []);
	
	return (
		<Layout className="flex min-h-screen items-center justify-center">
			<Result
				status="500"
				title="Oops!"
				subTitle={
					<div>
						{
							"Bizda vaqtincha nosozlik mavjud. Biz buning ustida ishlayapmiz"
						}
						<pre>
							<span className={"font-bold"}>
								{"Xatolik"}:
							</span>{" "}
							{error && <span>{error.toString()}</span>}
						</pre>
						
						{/*{errorInfo && <pre>{this.state.errorInfo.componentStack}</pre>}*/}
					</div>
				}
				extra={[
					// <Button type="primary" onClick={() => location.replace('/')} key={'home'}>
					//   {t('Bosh sahifa')}
					// </Button>,
					<Button
						onClick={() => location.reload()}
						key={"reload"}
					>
						{"Qayta yuklash"}
					</Button>,
				]}
			/>
		</Layout>
	);
};
