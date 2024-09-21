import { MenuProps } from "antd";
import { Button, Col, Dropdown, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { ICategory, IProduct } from "@src/interface";
import { SecondModal } from "@components/SecondModal";
import { FirstModal } from "@components/FirstModal";
import { useGetProductsQuery } from "@store/products";
import { useGetCategoriesQuery } from "@store/categories";
import { Footer } from "@components/Footer";
import { Product } from "@components/Product";
import { Basket } from "@components/Basket";

export const HomePage = () => {
  const {
    data: products,
    isLoading: ProductLoading,
    error: ProductError,
  } = useGetProductsQuery(undefined);

  const {
    data: categories,
    isLoading: CategoryLoading,
    error: CategoryError,
  } = useGetCategoriesQuery(undefined);

  const [category, setCategory] = useState<string | number>();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Аккаунт",
        key: "0",
      },
      {
        label: "Настройки",
        key: "1",
      },
    ],
    [],
  );

  if (ProductLoading || CategoryLoading) {
    return <div>Loading</div>;
  }

  if (ProductError) {
    console.error(ProductError);
    return <div>Error fetching products</div>;
  }

  if (CategoryError) {
    console.error(CategoryError);
    return <div>Error fetching categories</div>;
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
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button type="text" shape="circle">
                <CgProfile style={{ color: "white", fontSize: "26px" }} />
              </Button>
            </Dropdown>
          </div>
        </header>

        <Row className="my-10 lg:w-[800px]">
          <Col sm={10} className="w-full">
            <img src="/pic.png" alt="" className="mx-auto" />
          </Col>
          <Col sm={14} className="w-full flex items-center">
            <div className="text-center sm:text-start mx-auto">
              <Typography.Title level={1} style={{ color: "white" }}>
                Только самые <br />
                <span className="text-secondary">сочные бургеры!</span>
              </Typography.Title>
              <Typography className="text-white mt-12">
                Бесплатная доставка от 599₽
              </Typography>
            </div>
          </Col>
        </Row>
      </div>
      <div
        className="mx-5 mt-10 pb-2 flex"
        style={{
          overflowX: "auto",
        }}
      >
        {categories.map((c: ICategory, index: number) => (
          <div
            key={index}
            onClick={() => {
              setCategory(c.id);
            }}
            className={c.id === category ? "bg-primary text-white" : "bg-white"}
            style={{
              borderRadius: "24px",
              paddingInline: "30px",
              marginInline: "12px",
              height: "40px",
              textWrap: "nowrap",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img src="/category.svg" alt="" />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
      <div className="container my-10 mx-auto px-5">
        <Row gutter={20}>
          <Col xl={6} className="" style={{ marginBlock: "12px" }}>
            <Basket />
          </Col>
          <Col xl={18}>
            <Row gutter={20}>
              {products
                ?.filter((c: IProduct) => c.categoryId == category)
                .map((item: IProduct, index: number) => (
                  <Product
                    key={item.id}
                    item={item}
                    index={index}
                    loading={ProductLoading}
                  />
                ))}
            </Row>
          </Col>
        </Row>
      </div>
      <Footer />
      <FirstModal products={products} />
      <SecondModal />
    </div>
  );
};
