// app/edit/[id]/page.tsx
import EditClientWrapper from "./EditClientWrapper";

export const metadata = {
  title: "Блог засах",
};

export const dynamic = 'force-dynamic';

export default function Edit() {
  return <EditClientWrapper />;
}
