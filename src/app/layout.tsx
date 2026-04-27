"use client";

import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import { GlobalStateProvider } from "@/lib/stages";
import { InglespolSalesChat } from "@/components/inglespol-sales-chat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CopilotKit
          publicApiKey="ck_pub_43a698f5fe8def958b149ba0ee1a82b2"
          showDevConsole={false}
        >
          <GlobalStateProvider>
            <div className="h-screen w-screen grid grid-cols-[40fr,60fr] p-10 gap-5">
              {/* INTERNAL PANEL - NOT VISIBLE TO END USERS */}
              <div className="overflow-y-auto rounded-xl border bg-red-50 relative">
                <div className="sticky top-0 bg-red-100 border-b border-red-300 p-4 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h2 className="text-red-800 font-bold text-lg">🔒 INTERNAL VIEW</h2>
                  </div>
                  <p className="text-red-700 text-sm mt-2">
                    This panel is for development/admin only - <strong>END USERS CANNOT SEE THIS</strong>
                  </p>
                </div>
                <div className="p-4">
                  {children}
                </div>
              </div>

              {/* USER-FACING PANEL - WHAT END USERS SEE */}
              <div className="flex flex-col overflow-y-auto rounded-xl bg-green-50 border-2 border-green-300">
                <div className="bg-green-100 border-b border-green-300 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h2 className="text-green-800 font-bold text-lg">👥 USER EXPERIENCE</h2>
                  </div>
                  <p className="text-green-700 text-sm mt-2">
                    This is what <strong>REAL USERS SEE</strong> - the actual INGLESPOL interface
                  </p>
                </div>
                <div className="flex-1 flex justify-center items-center p-4">
                  <InglespolSalesChat className="w-full h-full" />
                </div>
              </div>
            </div>
          </GlobalStateProvider>
        </CopilotKit>
      </body>
    </html>
  );
}