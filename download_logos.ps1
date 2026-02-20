$logos = @{
    "camillus" = "camillusknives.com";
    "case" = "caseknives.com";
    "cobratech" = "cobratecknives.com";
    "coldsteel" = "coldsteel.com";
    "crkt" = "crkt.com";
    "kabar" = "ka-bar.com";
    "kershaw" = "kershaw.kaiusa.com";
    "mantis" = "mantis-knives.com";
    "schrade" = "schrade.com";
    "sog" = "sogknives.com";
    "spyderco" = "spyderco.com";
    "stroup" = "stroupknives.com";
    "templar" = "templarknife.com";
    "xcaliber" = "xcalibertactical.com"
}

$outputDir = "public\logos"
if (!(Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir
}

foreach ($name in $logos.Keys) {
    $url = "https://logo.clearbit.com/" + $logos[$name]
    $outFile = Join-Path -Path $outputDir -ChildPath "$name.png"
    Write-Host "Downloading $name from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $name. Creating placeholder."
        # Create a simple placeholder text file if image fails, to avoid 404s breaking build? 
        # Actually better to just leave it missing so Alt text shows.
    }
}
