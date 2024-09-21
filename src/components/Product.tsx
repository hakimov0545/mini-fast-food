import Title from "antd/es/typography/Title";
import { Button, Col, Skeleton } from "antd";
import queryString from "query-string";
import { IProduct } from "@src/interface";
import { useNavigate } from "react-router-dom";

export const Product = ({
  item,
  index,
  loading,
}: {
  item: IProduct;
  index: number;
  loading: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Col key={index} xs={12} md={6} lg={8} xl={8} className="px-3 py-3">
      <div
        style={{ borderRadius: "18px", backgroundColor: "white" }}
        className="px-3 py-3"
      >
        {loading ? (
          <>
            <Skeleton.Image active={true} />
            <br />
            <Skeleton.Input
              active={true}
              size="default"
              block={false}
              className="mt-2"
            />
            <br />
            <Skeleton.Input
              active={true}
              size="small"
              block={false}
              className="mt-2"
            />
            <Skeleton.Button
              active={true}
              size="default"
              block={true}
              className="mt-3"
            />
          </>
        ) : (
          <>
            <img
              src={item.image}
              alt=""
              className="w-full"
              style={{ borderRadius: "12px" }}
            />
            <Title level={3} className="mt-2">
              {item.price}₽
            </Title>
            <h3
              className="mb-7"
              style={{ fontSize: "16px", fontWeight: "400" }}
            >
              {item.title}
            </h3>
            <h4 className="text-gray-400 mb-2">{item.weight}г</h4>
            <Button
              className="w-full bg-[#F2F2F3] hover:!bg-[#F2F2F3] border-0"
              style={{ borderRadius: "12px" }}
              onClick={() => {
                navigate(
                  "?" +
                    queryString.stringify({
                      add: true,
                      id: item.id,
                    }),
                );
              }}
            >
              Добавить
            </Button>
          </>
        )}
      </div>
    </Col>
  );
};
