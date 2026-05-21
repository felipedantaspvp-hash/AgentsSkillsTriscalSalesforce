const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) {
    return { copied: false, reason: `Fonte não encontrada: ${sourcePath}` };
  }

  const targetDir = path.dirname(targetPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);

  return { copied: true };
}

function activate(context) {
  const disposable = vscode.commands.registerCommand('triscal.updateAgentsSkill', async () => {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders || folders.length === 0) {
      vscode.window.showErrorMessage('Abra uma pasta/projeto no VSCode para atualizar os padrões Triscal.');
      return;
    }

    const workspaceRoot = folders[0].uri.fsPath;

    // A extensão usa como origem os arquivos do próprio pacote.
    const extensionRoot = context.extensionPath;
    const sourceAgents = path.join(extensionRoot, 'templates', 'AGENTS.md');
    const sourceSkill = path.join(extensionRoot, 'templates', 'SKILL.md');
    const sourceHandlers = path.join(extensionRoot, 'templates', 'AI_HANDLERS_TRISCAL.md');

    const targetAgents = path.join(workspaceRoot, 'AGENTS.md');
    const targetSkill = path.join(workspaceRoot, 'agents', 'skills', 'triscal-salesforce', 'SKILL.md');
    const targetHandlers = path.join(workspaceRoot, 'AI_HANDLERS_TRISCAL.md');

    const agentsResult = copyIfExists(sourceAgents, targetAgents);
    const skillResult = copyIfExists(sourceSkill, targetSkill);
    const handlersResult = copyIfExists(sourceHandlers, targetHandlers);

    const errors = [];
    if (!agentsResult.copied) errors.push(agentsResult.reason);
    if (!skillResult.copied) errors.push(skillResult.reason);
    if (!handlersResult.copied) errors.push(handlersResult.reason);

    if (errors.length > 0) {
      vscode.window.showErrorMessage(`Falha ao atualizar arquivos Triscal: ${errors.join(' | ')}`);
      return;
    }

    vscode.window.showInformationMessage('AGENTS.md, SKILL.md e AI_HANDLERS_TRISCAL.md atualizados com sucesso.');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
