<?php

namespace App\Console\Commands;

use Directory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CreateTraitCommand extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'make:trait {file}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Create a new trait file.';

  /**
   * Execute the console command.
   */
  public function handle()
  {

    $fileName = str_replace("\\", "/", $this->arguments()['file']);
    $namespace = str_replace('/', '\\', $fileName);
    $fileContent = <<<fileContent
    <?php
      namespace App\Traits\\{$namespace};
      trait {$fileName} {

      }
    fileContent;


    if (!Storage::disk('app')->exists("Traits")) {
      $this->info(Storage::disk('app')->makeDirectory("Traits"));
    }

    if (Storage::disk('app')->fileExists('Traits/' . $fileName . '.php')) {
      $this->error("Trait already created.");
      exit();
    }


    Storage::disk('app')->put(
      'Traits/' . $fileName . '.php',
      $fileContent
    );
    $this->info('trait created successfully.');

  }
}
