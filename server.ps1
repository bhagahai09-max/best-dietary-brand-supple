$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server started on http://localhost:8080/"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $PWD.Path + $request.Url.LocalPath.Replace("/", "\")
        if ($localPath.EndsWith("\")) { $localPath += "index.html" }
        
        if (Test-Path $localPath -PathType Leaf) {
            try {
                $bytes = [System.IO.File]::ReadAllBytes($localPath)
                $response.ContentLength64 = $bytes.Length
                if ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
                elseif ($localPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
                elseif ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
                elseif ($localPath.EndsWith(".jpg") -or $localPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
                elseif ($localPath.EndsWith(".png")) { $response.ContentType = "image/png" }
                
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
