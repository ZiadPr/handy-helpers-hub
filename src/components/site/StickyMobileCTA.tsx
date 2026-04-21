import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export const StickyMobileCTA = ({ providerId }: { providerId: string }) => {
  const { t } = useLang();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl p-3 flex gap-2 shadow-elegant">
      <Link to={`/request/${providerId}`} className="flex-1">
        <Button className="w-full bg-gold-gradient text-primary border-0 shadow-gold h-11 font-semibold">
          {t.common.orderNow}
        </Button>
      </Link>
      <Link to="/chat">
        <Button variant="outline" size="icon" className="h-11 w-11" aria-label={t.common.chat}>
          <MessageCircle className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};
