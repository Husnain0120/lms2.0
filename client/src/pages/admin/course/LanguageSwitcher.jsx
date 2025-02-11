import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "ur", name: "Urdu" },
];

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const handleLanguageChange = async (language) => {
    onLanguageChange(language);

    if (language === "ur") {
      if ("keyboard" in navigator) {
        try {
          await navigator.keyboard.getLayoutMap();
          // This will prompt the user to switch to an Urdu keyboard
          await navigator.keyboard.lock(["ur"]);
        } catch (error) {
          console.error("Failed to set Urdu keyboard:", error);
          alert("Please switch to an Urdu keyboard manually to type in Urdu.");
        }
      } else {
        alert("Please switch to an Urdu keyboard manually to type in Urdu.");
      }
    }
  };

  return (
    <Select onValueChange={handleLanguageChange} value={currentLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
