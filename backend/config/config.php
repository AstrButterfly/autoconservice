<?php
namespace Config;

class SettingsManager {
    private static $instance = null;
    private $settingsFile;
    private $settings = [];

    private function __construct() {
        $this->settingsFile = __DIR__ . "/../../data/settings.json";
        if (file_exists($this->settingsFile)) {
            $this->settings = json_decode(file_get_contents($this->settingsFile), true);
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new SettingsManager();
        }
        return self::$instance;
    }

    public function getSettings() {
        return $this->settings;
    }

    public function updateSetting($key, $value) {
        $this->settings[$key] = $value;
        file_put_contents($this->settingsFile, json_encode($this->settings));
    }
}
