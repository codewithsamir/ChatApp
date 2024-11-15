import ChatLayout from "@/components/Chatdasboard/ChatLayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


 
  
  return (

      

  
        <div className="flex h-screen bg-black text-white">
      <ChatLayout />
  
        {/* Main Chat Area */}
        <div className="flex-1 p-2 bg-gray-900">
       
              {children}
          
        </div>
      </div>
  
  );
}
