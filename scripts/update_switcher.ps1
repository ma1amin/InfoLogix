$basePath = 'e:/faris/infologix'
$pageFiles = @(
    'en/index.html','en/about.html','en/contact.html','en/services.html','en/products.html','en/privacy.html','en/terms.html',
    'ar/index.html','ar/about.html','ar/contact.html','ar/services.html','ar/products.html','ar/privacy.html','ar/terms.html'
)

$blockPattern = '<!--\s*Language\s*&\s*Theme\s*Switcher\s*-->[\s\S]*?</div>\s*</div>\s*</div>'
$navPattern = '\s*<li class="nav-item">\s*<a class="nav-link[^>]*lang-switch"[\s\S]*?</li>'
$bodyPattern = '(<body[^>]*>)'
$regexOptions = [System.Text.RegularExpressions.RegexOptions]::Singleline

$snippetEnTemplate = @'
    <!-- Quick Switcher -->
    <div class="quick-switcher">
        <button class="switch-btn theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme">
            <i class="fas fa-moon" id="themeIcon"></i>
        </button>
        <a href="{0}" class="switch-btn lang-toggle lang-btn" data-lang="ar" aria-label="Switch to Arabic">
            AR
        </a>
    </div>
'@

$snippetArTemplate = @'
    <!-- محول سريع -->
    <div class="quick-switcher">
        <button class="switch-btn theme-toggle" id="themeToggle" type="button" aria-label="تبديل النمط">
            <i class="fas fa-moon" id="themeIcon"></i>
        </button>
        <a href="{0}" class="switch-btn lang-toggle lang-btn" data-lang="en" aria-label="الانتقال إلى الإنجليزية">
            EN
        </a>
    </div>
'@

foreach ($relativePath in $pageFiles) {
    $fullPath = Join-Path $basePath $relativePath
    if (-not (Test-Path $fullPath)) {
        Write-Warning "Missing file: $relativePath"
        continue
    }

    $content = Get-Content -Raw -Path $fullPath
    $updatedContent = [System.Text.RegularExpressions.Regex]::Replace($content, $blockPattern, "\n", $regexOptions)
    $updatedContent = [System.Text.RegularExpressions.Regex]::Replace($updatedContent, $navPattern, "\n", $regexOptions)

    if ($updatedContent -notmatch 'quick-switcher') {
        $lang = (Split-Path $relativePath -Parent).Split('/')[0]
        $fileName = [System.IO.Path]::GetFileName($relativePath)
        $target = if ($lang -eq 'en') { "../ar/$fileName" } else { "../en/$fileName" }
        $snippetTemplate = if ($lang -eq 'en') { $snippetEnTemplate } else { $snippetArTemplate }
        $snippet = [string]::Format($snippetTemplate, $target)

        $updatedContent = [System.Text.RegularExpressions.Regex]::Replace(
            $updatedContent,
            $bodyPattern,
            "$1`n$snippet`n",
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase,
            1
        )
    }

    if ($updatedContent -ne $content) {
        Set-Content -Path $fullPath -Value $updatedContent -Encoding UTF8
        Write-Host "Updated $relativePath"
    }
}
