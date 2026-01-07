# 输出最近提交与关键配置（pom.xml / application.yml 等）
"`n## recent commits`n"
git log -n 10 --oneline

$files = @("pom.xml", "application.yml", "application.yaml", "application.properties")
foreach ($f in $files) {
  if (Test-Path $f) {
    "`n## $f (head)`n"
    Get-Content $f -TotalCount 200
  }
}
