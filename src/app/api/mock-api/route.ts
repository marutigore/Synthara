import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sampleData = [
    { id: 1, title: "Synthetic Product A", price: 99.99, status: "available" },
    { id: 2, title: "Synthetic Product B", price: 149.50, status: "available" },
    { id: 3, title: "Synthetic Product C", price: 29.99, status: "out_of_stock" }
  ];

  return NextResponse.json({
    status: "active",
    endpoint: "/api/mock-api",
    totalRecords: sampleData.length,
    data: sampleData
  });
}
