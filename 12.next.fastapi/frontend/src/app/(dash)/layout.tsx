import ProtectedRoute from "@/components/ProtectedRouter";

import { MobileHeader } from '@/components/mobile/mobile-header';
import { Sidebar } from '@/components/sidebar/sidebar'

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return <>
    <ProtectedRoute>
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />

    <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
      <div className="h-full">
        {children}

      </div>
    </main>
    </ProtectedRoute>
  </>;
};

export default LessonLayout;