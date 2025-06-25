{ pkgs ? import <nixpkgs> { }, lib ? pkgs.lib }:
let

in
pkgs.mkShell {
  buildInputs = with pkgs;[
    openssl
    nodePackages_latest.nodejs
  ];

  shellHook = ''
    npm install
  '';
}