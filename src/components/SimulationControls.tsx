interface SimulationControlsProps {
  isRunning: boolean;
  speed: number;
  maxNumVehicles: number;
  vehCapacity: number;
  maxNumRequest: number;
  maxWaitTime: number;
  hiddenDim: number;
  batchSize: number;
  learningRate: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function fmtInt(n: number): string {
  return n > 0 ? String(n) : '—';
}

function fmtLearningRate(x: number): string {
  if (x === 0 || !Number.isFinite(x)) return '—';
  const str = x.toExponential();
  return str
    .replace(/^([+-]?)(\d)\.0(e[-+]\d+)$/, '$1$2$3')
    .replace(/e\+(?=\d)/, 'e');
}

export default function SimulationControls({
  isRunning,
  maxNumVehicles,
  vehCapacity,
  maxWaitTime,
  maxNumRequest,
  hiddenDim,
  batchSize,
  learningRate,
  onStart,
  onStop,
  onReset,
}: SimulationControlsProps) {
  return (
    <div className="panel controls-panel">
      <h3 className="panel-title">Simulation Controls</h3>
      <div className="controls-grid">
        <div className="control-buttons">
          {isRunning ? (
            <button type="button" className="btn btn-warning" onClick={onStop}>
              ⏸ Pause
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onStart}>
              ▶ Start
            </button>
          )}
          <button type="button" className="btn btn-danger" onClick={onReset}>
            ↺ Reset
          </button>
        </div>

        <div className="control-config">
          <div className="control-config-title">Environment</div>
          <dl className="control-config-rows">
            <div className="control-config-row">
              <dt>Vehicles</dt>
              <dd>
                <strong>{fmtInt(maxNumVehicles)}</strong>
              </dd>
            </div>
            <div className="control-config-row">
              <dt>Vehicle capacity</dt>
              <dd>
                <strong>{fmtInt(vehCapacity)}</strong>
              </dd>
            </div>
            <div className="control-config-row">
              <dt>Max requests (slots)</dt>
              <dd>
                <strong>{fmtInt(maxNumRequest)}</strong>
              </dd>
            </div>
            <div className="control-config-row">
              <dt>Max wait time</dt>
              <dd>
                <strong>{fmtInt(maxWaitTime)}</strong> min
              </dd>
            </div>
          </dl>

          <div className="control-config-title">Policy network (trained)</div>
          <dl className="control-config-rows">
            <div className="control-config-row">
              <dt>Hidden dim</dt>
              <dd>
                <strong>{fmtInt(hiddenDim)}</strong>
              </dd>
            </div>
            <div className="control-config-row">
              <dt>Batch size</dt>
              <dd>
                <strong>{fmtInt(batchSize)}</strong>
              </dd>
            </div>
            <div className="control-config-row">
              <dt>Learning rate</dt>
              <dd>
                <strong>{fmtLearningRate(learningRate)}</strong>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
