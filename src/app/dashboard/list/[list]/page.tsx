import Header from "@/components/page/header";
import CompanyCard from "@/components/companyCard/companyCard";
import CompanyCardList from "@/components/companyCardList";

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
