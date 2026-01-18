import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import QRCodeDataUrl from "@/components/ui/qrcodedataurl";
import { Download, Trash2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrText, setQrText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to generate a QR code.",
        variant: "destructive",
      });
      return;
    }
    setQrText(inputText);
    setIsGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "Your QR code has been created successfully!",
    });
  };

  const handleDownload = () => {
    if (!isGenerated) return;

    const canvas = qrRef.current?.querySelector("img");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.src;
      link.click();
      toast({
        title: "Download Started",
        description: "Your QR code is being downloaded.",
      });
    }
  };

  const handleClear = () => {
    setInputText("");
    setQrText("");
    setIsGenerated(false);
    toast({
      title: "Cleared",
      description: "Input and QR code have been reset.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <QrCode className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">QR Code Generator</h1>
          <p className="text-muted-foreground">
            Convert any text into a scannable QR code instantly
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Generate Your QR Code</CardTitle>
            <CardDescription>
              Enter text, URL, contact information, or any content you want to encode
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Section */}
            <div className="space-y-2">
              <Label htmlFor="qr-input">Text Content</Label>
              <Textarea
                id="qr-input"
                placeholder="Enter text, URL, or any content here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate} 
              className="w-full"
              size="lg"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>

            {/* QR Code Display */}
            {isGenerated && qrText && (
              <div className="space-y-4">
                <div className="border-t pt-6">
                  <Label className="mb-4 block text-center">Your QR Code</Label>
                  <div 
                    ref={qrRef}
                    className="flex justify-center items-center p-8 bg-muted/30 rounded-lg"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <QRCodeDataUrl 
                        text={qrText} 
                        width={256}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row">
                  <Button 
                    onClick={handleDownload}
                    variant="default"
                    className="flex-1"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button 
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2026 QR Code Generator. Fast, simple, and secure.</p>
        </div>
      </div>
    </div>
  );
}
