import { MenuProps, message, Skeleton } from "antd";
import { Button, Col, Dropdown, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
	CategoriesResponse,
	ICategory,
	IProduct,
	ProductsResponse,
} from "@src/interface";
import { FirstModal } from "@components/FirstModal";
import { Footer } from "@components/Footer";
import { Product } from "@components/Product";
import { Basket } from "@components/Basket";
import { Roll, Slide } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import { api } from "@src/api";

export const HomePage = () => {
	const [category, setCategory] = useState<string>();
	const [products, setProducts] = useState<IProduct[]>();
	const { data: productsData, isLoading: ProductLoading } =
		useQuery<ProductsResponse>(["products"], async () => {
			const res = await api.get("/products?populate=*");
			return res.data;
		});

	const { data: categories, isLoading: CategoryLoading } =
		useQuery<CategoriesResponse>(["categories"], async () => {
			const res = await api.get("/categories?populate=*");
			return res.data;
		});

	useEffect(() => {
		if (categories && categories.data.length > 0) {
			setCategory(categories?.data[0].documentId);
		}
	}, [categories]);

	useEffect(() => {
		if (productsData?.data) setProducts(productsData?.data);
	}, [productsData]);

	useEffect(() => {
		const res = productsData?.data.filter(
			(i) => i.category.documentId === category
		);

		setProducts(res);
	}, [category]);

	const items: MenuProps["items"] = useMemo(
		() => [
			{
				label: "Аккаунт",
				key: "0",
				onClick: () => {},
			},
			{
				label: "Выйти",
				key: "1",
				onClick: () => {
					localStorage.removeItem("token");
					localStorage.removeItem("userId");
					message.success("Вы вышли из аккаунта");
				},
			},
		],
		[]
	);

	if (ProductLoading || CategoryLoading) {
		return (
			<>
				<div
					style={{
						height: "500px",
						background: "url('/ellipse.svg')",
						backgroundSize: "cover",
						backgroundPosition: "top center",
					}}
					className="flex items-center py-7 px-5"
				>
					<Row className="w-[100%]">
						<Col
							className="w-[100%] flex justify-center sm:justify-end"
							sm={10}
						>
							<Skeleton.Image
								style={{
									width: "100% !important",
									height: "500px !important",
								}}
								active
							/>
						</Col>
						<Col
							className="w-[100%] mt-5 sm:mt-0  pl-5"
							sm={14}
						>
							<Skeleton
								className="md:w-[400px]"
								active
							/>
						</Col>
					</Row>
				</div>
				<div className="mx-5 mt-10 pb-2 flex justify-center gap-5">
					<Skeleton.Button
						active
						shape="round"
						className="sm:!w-[120px]"
					/>
					<Skeleton.Button
						active
						shape="round"
						className="sm:!w-[120px]"
					/>
					<Skeleton.Button
						active
						shape="round"
						className="sm:!w-[120px]"
					/>
				</div>
			</>
		);
	}

	return (
		<div className="bg-[#F2F2F3] max-w-[100vw]">
			<div
				style={{
					background: "url('/ellipse.svg')",
					backgroundSize: "cover",
					backgroundPosition: "top center",
				}}
				className="flex flex-col items-center py-7 px-5"
			>
				<header className="container flex justify-between">
					<img src={"/logo.svg"} alt="" />
					<div>
						<Dropdown
							menu={{ items }}
							trigger={["click"]}
						>
							<Button type="text" shape="circle">
								<CgProfile
									style={{
										color: "white",
										fontSize: "26px",
									}}
								/>
							</Button>
						</Dropdown>
					</div>
				</header>

				<Row className="my-10 lg:w-[800px]">
					<Col sm={10} className="w-full">
						<Slide triggerOnce>
							<img
								src="/pic.png"
								alt=""
								className="mx-auto"
							/>
						</Slide>
					</Col>
					<Col
						sm={14}
						className="w-full flex items-center justify-center"
					>
						<Slide triggerOnce direction="right">
							<div className="text-center sm:text-start mx-auto">
								<Typography.Title
									level={1}
									style={{ color: "white" }}
								>
									Только самые <br />
									<span className="text-secondary">
										сочные бургеры!
									</span>
								</Typography.Title>
								<Roll triggerOnce>
									<Typography className="text-white mt-12">
										Бесплатная доставка от 5$
									</Typography>
								</Roll>
							</div>
						</Slide>
					</Col>
				</Row>
			</div>
			<div
				className="mx-5 mt-10 pb-2 flex"
				style={{
					overflowX: "auto",
				}}
			>
				{categories?.data.map(
					(c: ICategory, index: number) => (
						<div
							key={index}
							onClick={() => {
								setCategory(c.documentId);
							}}
							className={
								c.documentId === category
									? "bg-primary text-white"
									: "bg-white"
							}
							style={{
								borderRadius: "24px",
								paddingInline: "20px",
								marginInline: "12px",
								height: "40px",
								textWrap: "nowrap",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								gap: "8px",
							}}
						>
							{/* <img
								src={`http://localhost:1337/${c.icon.url}`}
								alt=""
							/> */}
							<p>{c.title}</p>
						</div>
					)
				)}
			</div>
			<div className="container my-10 mx-auto px-5">
				<Row gutter={20}>
					<Col
						xl={6}
						className=""
						style={{ marginBlock: "12px" }}
					>
						<Basket />
					</Col>
					<Col xl={18}>
						<Row gutter={20}>
							{products?.map(
								(item: IProduct, index: number) => (
									<Product
										key={item.documentId}
										item={item}
										index={index}
										loading={ProductLoading}
									/>
								)
							)}
						</Row>
					</Col>
				</Row>
			</div>
			<Footer />
			<FirstModal products={products as IProduct[]} />
		</div>
	);
};
