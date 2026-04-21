import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { providers } from "@/data/mock";
import { Image, MapPin, Send, DollarSign, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { id: number; from: "me" | "pro"; text: string; time: string; read?: boolean };

const Chat = () => {
  const { lang } = useLang();
  const [active, setActive] = useState(providers[0].id);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, from: "pro", text: lang === "ar" ? "أهلاً بحضرتك، إزاي أقدر أساعدك؟" : "Hello! How can I help?", time: "10:24" },
    { id: 2, from: "me", text: lang === "ar" ? "في تسريب في الحمام" : "There's a bathroom leak", time: "10:25", read: true },
    { id: 3, from: "pro", text: lang === "ar" ? "تمام، تقدر تبعت صورة؟" : "Got it, can you send a photo?", time: "10:26" },
  ]);
  const provider = providers.find((p) => p.id === active)!;

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: m.length + 1, from: "me", text, time: "now", read: false }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, { id: m.length + 1, from: "pro", text: lang === "ar" ? "تمام، أنا في الطريق ✨" : "Sure, I'm on the way ✨", time: "now" }]);
    }, 1200);
  };

  return (
    <div className="container py-6 animate-fade-in">
      <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-180px)]">
        <Card className="p-2 overflow-y-auto">
          {providers.slice(0, 6).map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={cn(
                "w-full text-start flex items-center gap-3 p-3 rounded-xl transition-colors",
                active === p.id ? "bg-accent-soft" : "hover:bg-secondary"
              )}
            >
              <img src={p.avatar} alt="" className="h-12 w-12 rounded-xl" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm truncate">{lang === "ar" ? p.nameAr : p.nameEn}</div>
                  <span className="text-[10px] text-muted-foreground">10:2{p.id.charAt(1)}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {lang === "ar" ? "تمام، أنا في الطريق ✨" : "Sure, on the way ✨"}
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-success" />
            </button>
          ))}
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="border-b border-border p-3 flex items-center gap-3">
            <img src={provider.avatar} alt="" className="h-10 w-10 rounded-xl" />
            <div className="flex-1">
              <div className="font-semibold">{lang === "ar" ? provider.nameAr : provider.nameEn}</div>
              <div className="text-xs text-success flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                {lang === "ar" ? "متصل" : "Online"}
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <DollarSign className="h-3 w-3" />
              {lang === "ar" ? "عرض سعر" : "Quote"}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2",
                  m.from === "me"
                    ? "bg-primary-gradient text-primary-foreground rounded-br-sm rtl:rounded-br-2xl rtl:rounded-bl-sm"
                    : "bg-card rounded-bl-sm rtl:rounded-bl-2xl rtl:rounded-br-sm shadow-sm"
                )}>
                  <p className="text-sm">{m.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70">
                    {m.time}
                    {m.from === "me" && (m.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3 flex items-center gap-2">
            <Button variant="ghost" size="icon"><Image className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><MapPin className="h-4 w-4" /></Button>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type a message..."}
              className="flex-1"
            />
            <Button onClick={send} className="bg-primary-gradient text-primary-foreground" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;