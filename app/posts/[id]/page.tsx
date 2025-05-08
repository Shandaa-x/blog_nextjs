// app/posts/[id]/page.tsx
import PostsClientWrapper from "./PostsClientWrapper";

export const metadata = {
  title: "Нийтлэлүүд",
};

export const dynamic = 'force-dynamic';

export default function Post() {
  return <PostsClientWrapper />;
}
