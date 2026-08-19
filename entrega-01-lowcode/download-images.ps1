<#
Script para baixar imagens públicas (Wikimedia Commons) para o projeto.
Execute a partir da pasta entrega-01-lowcode com PowerShell:

  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  .\download-images.ps1

O script baixa imagens conhecidas do Wikimedia Commons e as salva em public/images.
#>

$images = @(
  @{src='https://upload.wikimedia.org/wikipedia/commons/0/02/Camel_in_desert.JPG'; dest='public/images/hero.jpg'},
  @{src='https://upload.wikimedia.org/wikipedia/commons/f/f1/Horseshoe.jpg'; dest='public/images/desert-pro.jpg'},
  @{src='https://upload.wikimedia.org/wikipedia/commons/e/eb/Blacksmith.jpg'; dest='public/images/long-ride.jpg'},
  @{src='https://upload.wikimedia.org/wikipedia/commons/0/02/Camel_in_desert.JPG'; dest='public/images/custom.jpg'},
  @{src='https://upload.wikimedia.org/wikipedia/commons/0/02/Camel_in_desert.JPG'; dest='public/images/camel-testimonial.jpg'}
)

if (-not (Test-Path -LiteralPath 'public\images')) {
  New-Item -ItemType Directory -Path 'public\images' | Out-Null
}

foreach ($it in $images) {
  try {
    Write-Host "Baixando $($it.src) -> $($it.dest)"
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
    $wc.DownloadFile($it.src, $it.dest)
    Write-Host "OK: $($it.dest)"
  } catch {
    Write-Host "Falha: $($_.Exception.Message)"
  }
}

Write-Host "Concluído. Verifique public/images para confirmar os arquivos baixados."
