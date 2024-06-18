import Header from "@/app/_components/page/header";
import CompanyCard from "@/app/_components/companyCard";
import CompanyCardList from "@/app/_components/companyCardList";

export default function ListPage() {
  return (
    <div>
      <Header>List Page</Header>
      <CompanyCardList>
        <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} />
        <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} />
        <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} />
        <CompanyCard company={{ name: "Apple Inc.", symbol: "APPL" }} />
      </CompanyCardList>
    </div>
  );
}
