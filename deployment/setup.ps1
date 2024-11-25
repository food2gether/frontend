$ApplicationComponent = "frontend" 
Invoke-Command -ScriptBlock ([ScriptBlock]::Create((Invoke-WebRequest https://raw.githubusercontent.com/food2gether/flux-base/refs/heads/main/bin/minikube-setup.ps1).Content))
