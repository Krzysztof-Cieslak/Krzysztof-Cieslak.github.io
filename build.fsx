// --------------------------------------------------------------------------------------
// FAKE build script
// --------------------------------------------------------------------------------------

#r @"packages/FAKE/tools/FakeLib.dll"
open Fake
open Fake.Git
open Fake.AssemblyInfoFile
open Fake.ReleaseNotesHelper
open Fake.UserInputHelper
open Fake.ZipHelper
open Fake.Testing
open System
open System.IO

// Target "Generate" (fun _ ->
//     CleanDir "_site"
//     let res = ProcessHelper.shellExec {Program = "jekyll.bat"; WorkingDirectory = @"C:\Users\Krzysztof\AppData\Local\scoop\apps\ruby\2.2.4\bin\"; CommandLine = "build"; Args = [] }
//     if res > 0 then failwith "generation failed"

// )

Target "Release" (fun _ ->
    let tempDocsDir = "temp"
    CleanDir tempDocsDir
    Repository.cloneSingleBranch "" "https://github.com/Krzysztof-Cieslak/Krzysztof-Cieslak.github.io.git" "master" tempDocsDir

    CopyRecursive "_site" tempDocsDir true |> tracefn "%A"
    StageAll tempDocsDir
    Git.Commit.Commit tempDocsDir "New blog release"
    Branches.push tempDocsDir
)

RunTargetOrDefault "Release"
