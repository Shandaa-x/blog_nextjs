// "use client";

export const metadata = {
    title: 'Миний нийтлэлүүд | Миний Блог',
    description: 'Энд таны нийтэлсэн нийтлэлүүд харагдана.',
  };
  
  import MyPostsClient from './MyPostsClient';
  
  export default function MyPostsPage() {
    return <MyPostsClient />;
  }
  