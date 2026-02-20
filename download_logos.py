import os
import requests

logos = {
    "camillus": "camillusknives.com",
    "case": "caseknives.com",
    "cobratech": "cobratecknives.com",
    "coldsteel": "coldsteel.com",
    "crkt": "crkt.com",
    "kabar": "ka-bar.com",
    "kershaw": "kershaw.kaiusa.com",
    "mantis": "mantis-knives.com",
    "schrade": "schrade.com",
    "sog": "sogknives.com",
    "spyderco": "spyderco.com",
    "stroup": "stroupknives.com",
    "templar": "templarknife.com",
    "xcaliber": "xcalibertactical.com"
}

output_dir = "public/logos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for name, domain in logos.items():
    url = f"https://logo.clearbit.com/{domain}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(f"{output_dir}/{name}.png", "wb") as f:
                f.write(response.content)
            print(f"Downloaded {name}.png")
        else:
            print(f"Failed to download {name} from {url} (Status: {response.status_code})")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
