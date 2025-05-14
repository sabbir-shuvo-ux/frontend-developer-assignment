import { TableContainer } from "./(components)/TableContainer";
import { MetaType, UserType } from "./(components)/types";

export type ApiResponse = {
  data: UserType[];
  meta: MetaType;
};

const getData = async (): Promise<ApiResponse> => {
  const res = await fetch("http://localhost:5000/api/users/", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return await res.json();
};

export default async function UserPage() {
  const data = await getData();

  return <TableContainer data={data.data} meta={data.meta} />;
}
